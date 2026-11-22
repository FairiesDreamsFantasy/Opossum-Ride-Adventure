/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * AudioGraphStabilizer — Web Audio Parameter Guard, DC Blocker, & Nyquist Limiter.
 */

export class SoundEngineStabilizer {
  public static readonly DENORMAL_EPS = 1e-18;

  public static sanitizeAudioParam(value: number, minVal: number, maxVal: number, fallback: number): number {
    if (!Number.isFinite(value)) return fallback;
    if (value < minVal) return minVal;
    if (value > maxVal) return maxVal;
    return Math.abs(value) < this.DENORMAL_EPS ? 0 : value;
  }

  public static clampAudioGain(gain: number, maxGain: number = 2.0): number {
    return this.sanitizeAudioParam(gain, 0, Math.max(0.1, maxGain), 0);
  }

  public static clampFrequencyHz(freqHz: number, sampleRateHz: number = 48000): number {
    const nyquistSafe = Math.max(40, Math.min(22000, this.sanitizeAudioParam(sampleRateHz, 8000, 192000, 48000) * 0.46));
    return this.sanitizeAudioParam(freqHz, 20, nyquistSafe, 440);
  }

  public static sanitizeScheduleTime(timeSec: number, currentCtxTimeSec: number): number {
    const base = Number.isFinite(currentCtxTimeSec) && currentCtxTimeSec >= 0 ? currentCtxTimeSec : 0;
    const t = Number.isFinite(timeSec) ? timeSec : base;
    return Math.max(base, t);
  }

  /**
   * First-order IIR DC-offset blocker: y[n] = x[n] - x[n-1] + R * y[n-1]
   */
  public static computeDcBlockerStep(
    sample: number,
    prevInput: number,
    prevOutput: number,
    poleR: number = 0.995
  ): number {
    const x = Number.isFinite(sample) ? sample : 0;
    const x1 = Number.isFinite(prevInput) ? prevInput : 0;
    const y1 = Number.isFinite(prevOutput) ? prevOutput : 0;
    const r = this.sanitizeAudioParam(poleR, 0.9, 0.999, 0.995);
    const out = x - x1 + r * y1;
    return Math.abs(out) < this.DENORMAL_EPS ? 0 : out;
  }
}
