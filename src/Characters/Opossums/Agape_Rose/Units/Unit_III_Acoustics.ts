/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FormantBand {
  frequencyHz: number;
  bandwidthHz: number;
  gainDb: number;
  qFactor: number;
}

export interface AcousticVocalProfile {
  name: string;
  id: string;
  pitchOffsetRatio: number;
  startFrequencyHz: number;
  endFrequencyHz: number;
  chirpCount: number;
  chirpDurationSeconds: number;
  chirpSpacingSeconds: number;
  peakGain: number;
  carrierWaveform: "sawtooth" | "square" | "sine" | "triangle";
  formants: {
    F0: FormantBand;
    F1: FormantBand;
    F2: FormantBand;
    F3: FormantBand;
    F4: FormantBand;
  };
}

export function calculateBiquadBandpassCoefficients(fc: number, Q: number, fs: number = 44100) {
  const w0 = (2.0 * Math.PI * fc) / fs;
  const alpha = Math.sin(w0) / (2.0 * Q);
  return {
    b0: alpha / (1.0 + alpha),
    b1: 0,
    b2: -alpha / (1.0 + alpha),
    a0: 1.0,
    a1: (-2.0 * Math.cos(w0)) / (1.0 + alpha),
    a2: (1.0 - alpha) / (1.0 + alpha)
  };
}

export function evaluateChirpFrequency(t: number, duration: number, fStart: number, fEnd: number): number {
  if (t <= 0) return fStart;
  if (t >= duration) return fEnd;
  return fStart * Math.pow(fEnd / fStart, t / duration);
}

export const AGAPE_ROSE_ACOUSTICS: AcousticVocalProfile = {
  name: "Agape Rose",
  id: "agape_rose",
  pitchOffsetRatio: -0.0592,
  startFrequencyHz: 1223.04,
  endFrequencyHz: 423.36,
  chirpCount: 6,
  chirpDurationSeconds: 0.040,
  chirpSpacingSeconds: 0.080,
  peakGain: 0.188,
  carrierWaveform: "sawtooth",
  formants: {
    F0: { frequencyHz: 423.36, bandwidthHz: 42.0, gainDb: 0.0, qFactor: 10.0 },
    F1: { frequencyHz: 750.0, bandwidthHz: 75.0, gainDb: -3.0, qFactor: 10.0 },
    F2: { frequencyHz: 1680.0, bandwidthHz: 110.0, gainDb: -6.0, qFactor: 15.0 },
    F3: { frequencyHz: 2650.0, bandwidthHz: 170.0, gainDb: -11.0, qFactor: 15.5 },
    F4: { frequencyHz: 3800.0, bandwidthHz: 240.0, gainDb: -16.0, qFactor: 15.8 }
  }
};

export default {
  AGAPE_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency
};
