/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * BiquadFilterDesigner — RBJ Cookbook Lowpass/Highpass/Bandpass & Pole-Radius Stability Guard.
 */

import { SoundEngineStabilizer } from "./AudioGraphStabilizer";

export interface SoundBiquadCoefficients {
  b0: number;
  b1: number;
  b2: number;
  a1: number;
  a2: number;
  stable: boolean;
}

export class BiquadFilterKernel {
  public static verifyPoleStability(a1: number, a2: number): boolean {
    if (!Number.isFinite(a1) || !Number.isFinite(a2)) return false;
    return Math.abs(a2) < 0.9999 && Math.abs(a1) < 1.0 + a2 - 1e-6;
  }

  public static designLowpass(cutoffHz: number, qFactor: number = 0.7071, sampleRateHz: number = 48000): SoundBiquadCoefficients {
    const fs = SoundEngineStabilizer.sanitizeAudioParam(sampleRateHz, 8000, 192000, 48000);
    const fc = SoundEngineStabilizer.clampFrequencyHz(cutoffHz, fs);
    const q = SoundEngineStabilizer.sanitizeAudioParam(qFactor, 0.25, 24.0, 0.7071);

    const w0 = (2.0 * Math.PI * fc) / fs;
    const cosW = Math.cos(w0);
    const alpha = Math.sin(w0) / (2.0 * q);
    const invA0 = 1.0 / (1.0 + alpha);

    const b1 = (1.0 - cosW) * invA0;
    const b0 = b1 * 0.5;
    const b2 = b0;
    const a1 = (-2.0 * cosW) * invA0;
    const a2 = (1.0 - alpha) * invA0;
    const stable = this.verifyPoleStability(a1, a2);
    return stable ? { b0, b1, b2, a1, a2, stable: true } : { b0: 1, b1: 0, b2: 0, a1: 0, a2: 0, stable: false };
  }

  public static designBandpass(centerHz: number, qFactor: number = 2.0, sampleRateHz: number = 48000): SoundBiquadCoefficients {
    const fs = SoundEngineStabilizer.sanitizeAudioParam(sampleRateHz, 8000, 192000, 48000);
    const fc = SoundEngineStabilizer.clampFrequencyHz(centerHz, fs);
    const q = SoundEngineStabilizer.sanitizeAudioParam(qFactor, 0.25, 24.0, 2.0);

    const w0 = (2.0 * Math.PI * fc) / fs;
    const cosW = Math.cos(w0);
    const alpha = Math.sin(w0) / (2.0 * q);
    const invA0 = 1.0 / (1.0 + alpha);

    const b0 = alpha * invA0;
    const b2 = -alpha * invA0;
    const a1 = (-2.0 * cosW) * invA0;
    const a2 = (1.0 - alpha) * invA0;
    const stable = this.verifyPoleStability(a1, a2);
    return stable ? { b0, b1: 0, b2, a1, a2, stable: true } : { b0: 1, b1: 0, b2: 0, a1: 0, a2: 0, stable: false };
  }

  public static applyDirectForm2Sample(
    input: number,
    coeffs: SoundBiquadCoefficients,
    state: { z1: number; z2: number }
  ): number {
    const x = Number.isFinite(input) ? input : 0;
    const y = coeffs.b0 * x + state.z1;
    state.z1 = coeffs.b1 * x - coeffs.a1 * y + state.z2;
    state.z2 = coeffs.b2 * x - coeffs.a2 * y;
    if (Math.abs(state.z1) < SoundEngineStabilizer.DENORMAL_EPS) state.z1 = 0;
    if (Math.abs(state.z2) < SoundEngineStabilizer.DENORMAL_EPS) state.z2 = 0;
    return Number.isFinite(y) ? y : 0;
  }
}
