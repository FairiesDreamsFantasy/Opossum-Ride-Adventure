/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * AcousticStabilizer — Computer-Science & IEEE 754 Numerical Stabilization Kernel
 * Prevents Web Audio subnormal CPU stalls, GC allocation spikes, parameter zipper noise,
 * unstable biquad poles, and polyphonic clipping bursts.
 */

export interface SlewChannelState {
  value: number;
  lastUpdateSec: number;
}

export class AcousticRingBuffer {
  private readonly data: Float64Array;
  private writeIndex = 0;
  private readIndex = 0;
  private count = 0;

  constructor(public readonly capacity: number = 1024) {
    const safeCap = Math.max(8, Math.floor(capacity));
    this.data = new Float64Array(safeCap);
  }

  public push(sample: number): boolean {
    const clean = AcousticStabilizer.flushDenormal(AcousticStabilizer.sanitizeFinite(sample, 0));
    if (this.count >= this.data.length) {
      // Overwrite oldest sample deterministically to keep real-time stream lock-free
      this.readIndex = (this.readIndex + 1) % this.data.length;
      this.count--;
    }
    this.data[this.writeIndex] = clean;
    this.writeIndex = (this.writeIndex + 1) % this.data.length;
    this.count++;
    return true;
  }

  public pop(): number | null {
    if (this.count === 0) return null;
    const val = this.data[this.readIndex];
    this.readIndex = (this.readIndex + 1) % this.data.length;
    this.count--;
    return val;
  }

  public computeRmsEnergy(): number {
    if (this.count === 0) return 0;
    let sumSq = 0;
    for (let i = 0; i < this.count; i++) {
      const idx = (this.readIndex + i) % this.data.length;
      const s = this.data[idx];
      sumSq += s * s;
    }
    return Math.sqrt(sumSq / this.count);
  }

  public clear(): void {
    this.data.fill(0);
    this.writeIndex = 0;
    this.readIndex = 0;
    this.count = 0;
  }

  public size(): number {
    return this.count;
  }
}

export class AcousticStabilizer {
  /** Threshold below which IEEE 754 float64 values are flushed to zero to avoid denormal stalls. */
  public static readonly DENORMAL_THRESHOLD = 1e-18;
  public static readonly MIN_AUDIBLE_FREQ_HZ = 20.0;
  public static readonly MAX_AUDIBLE_FREQ_HZ = 22000.0;

  private static readonly _slewRegistry = new Map<string, SlewChannelState>();

  /**
   * Sanitizes any numerical acoustic parameter against NaN, Infinity, or undefined.
   */
  public static sanitizeFinite(value: number, fallback: number = 0): number {
    return Number.isFinite(value) ? value : fallback;
  }

  /**
   * Clamps a finite acoustic scalar cleanly within [minVal, maxVal].
   */
  public static clampFinite(value: number, minVal: number, maxVal: number, fallback?: number): number {
    const safeFallback = fallback !== undefined ? fallback : minVal;
    const finiteVal = this.sanitizeFinite(value, safeFallback);
    if (finiteVal < minVal) return minVal;
    if (finiteVal > maxVal) return maxVal;
    return finiteVal;
  }

  /**
   * Flushes IEEE 754 subnormal / denormal floats to +0.0 to prevent filter stall spikes.
   */
  public static flushDenormal(value: number): number {
    if (!Number.isFinite(value) || Math.abs(value) < this.DENORMAL_THRESHOLD) {
      return 0;
    }
    return value;
  }

  /**
   * Clamps oscillator / biquad cutoff frequency below Nyquist safely.
   */
  public static clampNyquistFrequency(freqHz: number, sampleRateHz: number = 48000): number {
    const nyquistSafe = Math.max(this.MIN_AUDIBLE_FREQ_HZ, Math.min(this.MAX_AUDIBLE_FREQ_HZ, sampleRateHz * 0.46));
    return this.clampFinite(freqHz, this.MIN_AUDIBLE_FREQ_HZ, nyquistSafe, 440.0);
  }

  /**
   * Soft-knee hyperbolic tangent safety limiter preventing Web Audio bus clipping above 1.0.
   */
  public static applySoftKneeLimiter(linearGain: number, ceiling: number = 0.985, kneeThreshold: number = 0.72): number {
    const clean = this.clampFinite(linearGain, 0, 8.0, 0);
    if (clean <= kneeThreshold) {
      return clean;
    }
    const headroom = Math.max(0.05, ceiling - kneeThreshold);
    const excess = (clean - kneeThreshold) / headroom;
    const compressed = kneeThreshold + headroom * Math.tanh(excess);
    return Math.min(ceiling, this.flushDenormal(compressed));
  }

  /**
   * Polyphonic voice energy normalizer: scales per-voice gain by 1 / sqrt(activeVoices)
   * when many concurrent hoofsteps or wildlife calls overlap simultaneously.
   */
  public static normalizePolyphonicGain(baseGain: number, activeVoices: number, maxBudget: number = 128): number {
    const safeGain = this.clampFinite(baseGain, 0, 2.0, 0);
    const voices = Math.max(1, Math.min(maxBudget, Math.round(this.sanitizeFinite(activeVoices, 1))));
    if (voices <= 4) return this.applySoftKneeLimiter(safeGain);
    const attenuation = Math.sqrt(4 / voices);
    return this.applySoftKneeLimiter(safeGain * Math.max(0.28, attenuation));
  }

  /**
   * Exponential one-pole parameter slew smoother preventing clicks & zipper noise
   * when stereo pan or atmospheric filter cutoffs move quickly.
   */
  public static smoothParameter(
    channelKey: string,
    targetValue: number,
    nowSec: number,
    tauSec: number = 0.035
  ): number {
    const cleanTarget = this.sanitizeFinite(targetValue, 0);
    const cleanNow = this.sanitizeFinite(nowSec, 0);
    const safeTau = Math.max(0.001, this.sanitizeFinite(tauSec, 0.035));

    const prev = this._slewRegistry.get(channelKey);
    if (!prev || cleanNow <= prev.lastUpdateSec) {
      this._slewRegistry.set(channelKey, { value: cleanTarget, lastUpdateSec: cleanNow });
      return cleanTarget;
    }

    const dt = Math.min(0.25, cleanNow - prev.lastUpdateSec);
    const alpha = 1.0 - Math.exp(-dt / safeTau);
    const nextValue = this.flushDenormal(prev.value + (cleanTarget - prev.value) * alpha);
    prev.value = nextValue;
    prev.lastUpdateSec = cleanNow;
    return nextValue;
  }

  /**
   * Validates that second-order IIR denominator coefficients keep filter poles strictly inside
   * the unit circle (|a2| < 1 and |a1| < 1 + a2), preventing digital filter resonance blowup.
   */
  public static areBiquadPolesStable(a1: number, a2: number): boolean {
    if (!Number.isFinite(a1) || !Number.isFinite(a2)) return false;
    return Math.abs(a2) < 0.9999 && Math.abs(a1) < 1.0 + a2 - 1e-6;
  }

  public static resetSlewChannels(): void {
    this._slewRegistry.clear();
  }
}
