/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ROXANNE KONE-REYNOLDS - UNIT III: ACOUSTICS & VOCALIZATION SYNTHESIS
 * ============================================================================
 * Biomechanical acoustics, formant frequency modeling (F0-F4), biquad filter
 * transfer functions, and Web Audio DSP parameters for Roxanne's chatter.
 *
 * Vocal Profile:
 * - Fundamental Frequency Range (F0): 419.13 Hz - 1210.81 Hz (-6.8608% offset)
 * - Start Frequency: 1210.8096 Hz
 * - End Frequency: 419.1264 Hz
 * - Chirp Count: 6 chirps per elegant chatter burst
 * - Inter-chirp Spacing: 80 ms (0.08 s)
 * - Chirp Duration: 40 ms (0.04 s)
 * - Peak Amplitude Volume: 0.186
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

export interface BiquadFilterCoefficients {
  b0: number;
  b1: number;
  b2: number;
  a0: number;
  a1: number;
  a2: number;
}

export function calculateBiquadBandpassCoefficients(
  fc: number,
  Q: number,
  fs: number = 44100
): BiquadFilterCoefficients {
  const w0 = (2.0 * Math.PI * fc) / fs;
  const alpha = Math.sin(w0) / (2.0 * Q);

  const b0 = alpha;
  const b1 = 0.0;
  const b2 = -alpha;
  const a0 = 1.0 + alpha;
  const a1 = -2.0 * Math.cos(w0);
  const a2 = 1.0 - alpha;

  return {
    b0: b0 / a0,
    b1: b1 / a0,
    b2: b2 / a0,
    a0: 1.0,
    a1: a1 / a0,
    a2: a2 / a0
  };
}

export function evaluateChirpFrequency(
  t: number,
  duration: number,
  fStart: number,
  fEnd: number
): number {
  if (t <= 0) return fStart;
  if (t >= duration) return fEnd;
  const ratio = fEnd / fStart;
  return fStart * Math.pow(ratio, t / duration);
}

export const ROXANNE_KONE_REYNOLDS_ACOUSTICS: AcousticVocalProfile = {
  name: "Roxanne Kone-Reynolds",
  id: "roxanne_kone_reynolds",
  pitchOffsetRatio: -0.068608,
  startFrequencyHz: 1210.8096,
  endFrequencyHz: 419.1264,
  chirpCount: 6,
  chirpDurationSeconds: 0.040,
  chirpSpacingSeconds: 0.080,
  peakGain: 0.186,
  carrierWaveform: "sawtooth",
  formants: {
    F0: {
      frequencyHz: 419.13,
      bandwidthHz: 42.0,
      gainDb: 0.0,
      qFactor: 419.13 / 42.0 // ~9.98
    },
    F1: {
      frequencyHz: 748.0,   // Resonant protective pharyngeal tract
      bandwidthHz: 78.0,
      gainDb: -3.2,
      qFactor: 748.0 / 78.0 // 9.59
    },
    F2: {
      frequencyHz: 1670.0,  // Stately oral resonance
      bandwidthHz: 118.0,
      gainDb: -5.8,
      qFactor: 1670.0 / 118.0 // 14.15
    },
    F3: {
      frequencyHz: 2660.0,  // Deep nasal harmonic
      bandwidthHz: 175.0,
      gainDb: -10.4,
      qFactor: 2660.0 / 175.0 // 15.20
    },
    F4: {
      frequencyHz: 3800.0,  // Cranial resonance
      bandwidthHz: 245.0,
      gainDb: -15.9,
      qFactor: 3800.0 / 245.0 // 15.51
    }
  }
};

export default {
  ROXANNE_KONE_REYNOLDS_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency
};
