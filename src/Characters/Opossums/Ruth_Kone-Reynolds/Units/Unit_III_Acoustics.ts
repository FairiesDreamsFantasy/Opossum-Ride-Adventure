/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * RUTH KONE-REYNOLDS - UNIT III: ACOUSTICS & VOCALIZATION SYNTHESIS
 * ============================================================================
 * Biomechanical acoustics, formant frequency modeling (F0-F4), biquad filter
 * transfer functions, and Web Audio DSP parameters for Ruth's chatter.
 *
 * Vocal Profile:
 * - Fundamental Frequency Range (F0): 402.36 Hz - 1162.38 Hz (-10.5864% offset)
 * - Start Frequency: 1162.377216 Hz
 * - End Frequency: 402.361344 Hz
 * - Chirp Count: 6 chirps per elegant chatter burst
 * - Inter-chirp Spacing: 80 ms (0.08 s)
 * - Chirp Duration: 40 ms (0.04 s)
 * - Peak Amplitude Volume: 0.179
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

export const RUTH_KONE_REYNOLDS_ACOUSTICS: AcousticVocalProfile = {
  name: "Ruth Kone-Reynolds",
  id: "ruth_kone_reynolds",
  pitchOffsetRatio: -0.10586368,
  startFrequencyHz: 1162.377216,
  endFrequencyHz: 402.361344,
  chirpCount: 6,
  chirpDurationSeconds: 0.040,
  chirpSpacingSeconds: 0.080,
  peakGain: 0.179,
  carrierWaveform: "sawtooth",
  formants: {
    F0: {
      frequencyHz: 402.36,
      bandwidthHz: 44.0,
      gainDb: 0.0,
      qFactor: 402.36 / 44.0 // ~9.14
    },
    F1: {
      frequencyHz: 732.0,   // Resonant lower botanical pharynx
      bandwidthHz: 76.0,
      gainDb: -3.0,
      qFactor: 732.0 / 76.0 // 9.63
    },
    F2: {
      frequencyHz: 1605.0,  // Serene oral cavity resonance
      bandwidthHz: 116.0,
      gainDb: -5.6,
      qFactor: 1605.0 / 116.0 // 13.84
    },
    F3: {
      frequencyHz: 2580.0,  // Floral nasal resonance
      bandwidthHz: 172.0,
      gainDb: -10.2,
      qFactor: 2580.0 / 172.0 // 15.00
    },
    F4: {
      frequencyHz: 3730.0,  // Upper cranial tone
      bandwidthHz: 242.0,
      gainDb: -15.8,
      qFactor: 3730.0 / 242.0 // 15.41
    }
  }
};

export default {
  RUTH_KONE_REYNOLDS_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency
};
