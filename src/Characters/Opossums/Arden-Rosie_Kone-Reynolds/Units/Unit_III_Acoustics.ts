/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ARDEN-ROSIE KONE-REYNOLDS - UNIT III: ACOUSTICS & VOCALIZATION SYNTHESIS
 * ============================================================================
 * Biomechanical acoustics, formant frequency modeling (F0-F4), biquad filter
 * transfer functions, and Web Audio DSP parameters for Arden-Rosie's chatter.
 *
 * Vocal Profile:
 * - Fundamental Frequency Range (F0): 353.40 Hz - 1069.50 Hz
 * - Start Frequency: 1069.50 Hz
 * - End Frequency: 353.40 Hz
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

export const ARDEN_ROSIE_ACOUSTICS: AcousticVocalProfile = {
  name: "Arden-Rosie Kone-Reynolds",
  id: "arden_rosie",
  pitchOffsetRatio: 0.0,
  startFrequencyHz: 1069.50,
  endFrequencyHz: 353.40,
  chirpCount: 6,
  chirpDurationSeconds: 0.040,
  chirpSpacingSeconds: 0.080,
  peakGain: 0.20,
  carrierWaveform: "sawtooth",
  formants: {
    F0: {
      frequencyHz: 353.40,
      bandwidthHz: 38.0,
      gainDb: 0.0,
      qFactor: 353.40 / 38.0 // ~9.30
    },
    F1: {
      frequencyHz: 695.0,   // Resonant lower throat tract
      bandwidthHz: 74.0,
      gainDb: -3.0,
      qFactor: 695.0 / 74.0 // 9.39
    },
    F2: {
      frequencyHz: 1510.0,  // Compact oral resonance
      bandwidthHz: 112.0,
      gainDb: -5.4,
      qFactor: 1510.0 / 112.0 // 13.48
    },
    F3: {
      frequencyHz: 2470.0,  // Analytical nasal resonance
      bandwidthHz: 168.0,
      gainDb: -9.8,
      qFactor: 2470.0 / 168.0 // 14.70
    },
    F4: {
      frequencyHz: 3620.0,  // Cranial tone
      bandwidthHz: 235.0,
      gainDb: -15.2,
      qFactor: 3620.0 / 235.0 // 15.40
    }
  }
};

export default {
  ARDEN_ROSIE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency
};
