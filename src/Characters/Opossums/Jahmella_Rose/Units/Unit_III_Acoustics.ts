/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * JAHMELLA ROSE - UNIT III: ACOUSTICS & VOCALIZATION SYNTHESIS
 * ============================================================================
 * Biomechanical acoustics, formant frequency modeling (F0-F4), biquad filter
 * transfer functions, and Web Audio DSP parameters for Jahmella Rose's chatter.
 *
 * Vocal Profile:
 * - Fundamental Frequency Range (F0): 366.70 Hz - 1109.75 Hz
 * - Start Frequency: 1109.75 Hz (Tuned between Arden-Rosie and Ashley)
 * - End Frequency: 366.70 Hz
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

/**
 * Computes digital biquad bandpass filter coefficients for Jahmella's resonant vocal tract.
 */
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

/**
 * Evaluates exponential downward frequency chirp sweep:
 */
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

/**
 * Jahmella Rose's calibrated acoustic vocalization profile.
 */
export const JAHMELLA_ROSE_ACOUSTICS: AcousticVocalProfile = {
  name: "Jahmella Rose",
  id: "jahmella_rose",
  pitchOffsetRatio: 0.0,
  startFrequencyHz: 1109.75,
  endFrequencyHz: 366.70,
  chirpCount: 6,
  chirpDurationSeconds: 0.040,
  chirpSpacingSeconds: 0.080,
  peakGain: 0.20,
  carrierWaveform: "sawtooth",
  formants: {
    F0: {
      frequencyHz: 366.7,
      bandwidthHz: 40.0,
      gainDb: 0.0,
      qFactor: 366.7 / 40.0 // ~9.17
    },
    F1: {
      frequencyHz: 710.0,   // Resonant lower pharynx
      bandwidthHz: 75.0,
      gainDb: -3.0,
      qFactor: 710.0 / 75.0 // 9.47
    },
    F2: {
      frequencyHz: 1540.0,  // Stately oral cavity resonance
      bandwidthHz: 115.0,
      gainDb: -5.5,
      qFactor: 1540.0 / 115.0 // 13.39
    },
    F3: {
      frequencyHz: 2520.0,  // Nasal chamber resonance
      bandwidthHz: 170.0,
      gainDb: -10.0,
      qFactor: 2520.0 / 170.0 // 14.82
    },
    F4: {
      frequencyHz: 3680.0,  // Upper cranial resonance
      bandwidthHz: 240.0,
      gainDb: -15.0,
      qFactor: 3680.0 / 240.0 // 15.33
    }
  }
};

export default {
  JAHMELLA_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency
};
