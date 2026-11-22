/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * HarmonicOscillatorBank — PolyBLEP Anti-Aliasing, Golden Ratio Overtones, and FM Core.
 */

import { SoundEngineStabilizer } from "./AudioGraphStabilizer";

export class HarmonicSynthesisKernel {
  public static readonly GOLDEN_RATIO = 1.618033988749895;

  public static goldenRatioHarmonicSeries(fundamentalHz: number, partials: number = 4): number[] {
    const base = SoundEngineStabilizer.clampFrequencyHz(fundamentalHz, 48000);
    const count = Math.max(1, Math.min(16, Math.floor(partials)));
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      const freq = i === 0 ? base : base * (1 + i * (this.GOLDEN_RATIO - 1));
      result.push(SoundEngineStabilizer.clampFrequencyHz(freq, 48000));
    }
    return result;
  }

  public static evaluateFmSample(
    timeSec: number,
    carrierHz: number,
    modulatorHz: number,
    modulationIndex: number
  ): number {
    const t = Math.max(0, SoundEngineStabilizer.sanitizeAudioParam(timeSec, 0, 3600, 0));
    const fc = SoundEngineStabilizer.clampFrequencyHz(carrierHz, 48000);
    const fm = SoundEngineStabilizer.clampFrequencyHz(modulatorHz, 48000);
    const idx = SoundEngineStabilizer.sanitizeAudioParam(modulationIndex, 0, 12, 1.0);
    const mod = idx * Math.sin(2.0 * Math.PI * fm * t);
    const sample = Math.sin(2.0 * Math.PI * fc * t + mod);
    return Math.abs(sample) < SoundEngineStabilizer.DENORMAL_EPS ? 0 : sample;
  }

  public static polyBlepAntiAlias(phaseNorm: number, phaseIncNorm: number): number {
    const dt = Math.max(1e-6, Math.min(0.45, Math.abs(phaseIncNorm)));
    let t = phaseNorm - Math.floor(phaseNorm);
    if (t < dt) {
      t /= dt;
      return t + t - t * t - 1.0;
    }
    if (t > 1.0 - dt) {
      t = (t - 1.0) / dt;
      return t * t + t + t + 1.0;
    }
    return 0;
  }
}
