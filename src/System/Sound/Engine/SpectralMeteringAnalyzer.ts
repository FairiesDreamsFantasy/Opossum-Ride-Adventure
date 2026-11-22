/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SpectralMeteringAnalyzer — Real-Time RMS, Peak dBFS, and Zero-Crossing Rate Telemetry.
 */

import { SoundEngineStabilizer } from "./AudioGraphStabilizer";

export interface AudioBufferTelemetry {
  rmsLinear: number;
  rmsDb: number;
  peakLinear: number;
  peakDb: number;
  zeroCrossingRate: number;
}

export class SpectralMeteringKernel {
  public static analyzeSamples(samples: ArrayLike<number>): AudioBufferTelemetry {
    const n = samples.length;
    if (!n) {
      return { rmsLinear: 0, rmsDb: -120, peakLinear: 0, peakDb: -120, zeroCrossingRate: 0 };
    }
    let sumSq = 0;
    let peak = 0;
    let crossings = 0;
    let prev = Number.isFinite(samples[0]) ? samples[0] : 0;

    for (let i = 0; i < n; i++) {
      const s = Number.isFinite(samples[i]) ? samples[i] : 0;
      const absS = Math.abs(s);
      if (absS > peak) peak = absS;
      sumSq += s * s;
      if (i > 0 && ((prev >= 0 && s < 0) || (prev < 0 && s >= 0))) {
        crossings++;
      }
      prev = s;
    }

    const rms = Math.sqrt(sumSq / n);
    const rmsDb = rms > 1e-6 ? 20 * Math.log10(rms) : -120;
    const peakDb = peak > 1e-6 ? 20 * Math.log10(peak) : -120;
    return {
      rmsLinear: SoundEngineStabilizer.clampAudioGain(rms, 4.0),
      rmsDb: Math.max(-120, rmsDb),
      peakLinear: SoundEngineStabilizer.clampAudioGain(peak, 4.0),
      peakDb: Math.max(-120, peakDb),
      zeroCrossingRate: n > 1 ? crossings / (n - 1) : 0
    };
  }
}
