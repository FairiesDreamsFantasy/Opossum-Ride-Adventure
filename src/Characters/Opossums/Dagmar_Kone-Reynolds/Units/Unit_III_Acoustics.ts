/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * DAGMAR KONE-REYNOLDS - UNIT III: ACOUSTICS & VOCALIZATION SYNTHESIS
 * ============================================================================
 * Biomechanical acoustics, formant frequency modeling (F0-F4), biquad filter
 * transfer functions, and Web Audio DSP parameters for Dagmar's chatter.
 *
 * Vocal Profile:
 * - Fundamental Frequency Range (F0): 376.20 Hz - 1138.50 Hz
 * - Start Frequency: 1138.50 Hz
 * - End Frequency: 376.20 Hz
 * - Chirp Count: 6 chirps per elegant chatter burst
 * - Inter-chirp Spacing: 80 ms (0.08 s)
 * - Chirp Duration: 40 ms (0.04 s)
 * - Peak Amplitude Volume: 0.200
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

export const DAGMAR_KONE_REYNOLDS_ACOUSTICS: AcousticVocalProfile = {
  name: "Dagmar Kone-Reynolds",
  id: "dagmar_kone_reynolds",
  pitchOffsetRatio: 0.0,
  startFrequencyHz: 1138.50,
  endFrequencyHz: 376.20,
  chirpCount: 6,
  chirpDurationSeconds: 0.040,
  chirpSpacingSeconds: 0.080,
  peakGain: 0.20,
  carrierWaveform: "sawtooth",
  formants: {
    F0: {
      frequencyHz: 376.20,
      bandwidthHz: 40.0,
      gainDb: 0.0,
      qFactor: 376.20 / 40.0 // ~9.41
    },
    F1: {
      frequencyHz: 720.0,   // Resonant pharyngeal tract
      bandwidthHz: 75.0,
      gainDb: -3.0,
      qFactor: 720.0 / 75.0 // 9.60
    },
    F2: {
      frequencyHz: 1560.0,  // Stately oral cavity resonance
      bandwidthHz: 115.0,
      gainDb: -5.5,
      qFactor: 1560.0 / 115.0 // 13.57
    },
    F3: {
      frequencyHz: 2540.0,  // Nasal chamber resonance
      bandwidthHz: 170.0,
      gainDb: -10.0,
      qFactor: 2540.0 / 170.0 // 14.94
    },
    F4: {
      frequencyHz: 3710.0,  // Extended ear conch resonance
      bandwidthHz: 240.0,
      gainDb: -15.5,
      qFactor: 3710.0 / 240.0 // 15.46
    }
  }
};

export default {
  DAGMAR_KONE_REYNOLDS_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency
};
