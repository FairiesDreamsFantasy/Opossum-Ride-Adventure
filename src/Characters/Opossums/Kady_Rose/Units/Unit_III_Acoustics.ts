/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * KADY ROSE - UNIT III: ACOUSTICS & VOCALIZATION SYNTHESIS
 * ============================================================================
 * Biomechanical acoustics, formant frequency modeling (F0-F4), biquad filter
 * transfer functions, and Web Audio DSP parameters for Kady Rose's chatter.
 *
 * Vocal Profile:
 * - Fundamental Frequency Range (F0): 404.31 Hz - 1168.00 Hz (-10.1536% offset)
 * - Start Frequency: 1168.0032 Hz
 * - End Frequency: 404.3088 Hz
 * - Chirp Count: 6 chirps per elegant chatter burst
 * - Inter-chirp Spacing: 80 ms (0.08 s)
 * - Chirp Duration: 40 ms (0.04 s)
 * - Peak Amplitude Volume: 0.180
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

export const KADY_ROSE_ACOUSTICS: AcousticVocalProfile = {
  name: "Kady Rose",
  id: "kady_rose",
  pitchOffsetRatio: -0.101536,
  startFrequencyHz: 1168.0032,
  endFrequencyHz: 404.3088,
  chirpCount: 6,
  chirpDurationSeconds: 0.040,
  chirpSpacingSeconds: 0.080,
  peakGain: 0.180,
  carrierWaveform: "sawtooth",
  formants: {
    F0: {
      frequencyHz: 404.31,
      bandwidthHz: 44.0,
      gainDb: 0.0,
      qFactor: 404.31 / 44.0 // ~9.19
    },
    F1: {
      frequencyHz: 735.0,   // Resonant lower industrial chest cavity
      bandwidthHz: 76.0,
      gainDb: -3.0,
      qFactor: 735.0 / 76.0 // 9.67
    },
    F2: {
      frequencyHz: 1610.0,  // Sturdy oral tract resonance
      bandwidthHz: 116.0,
      gainDb: -5.6,
      qFactor: 1610.0 / 116.0 // 13.88
    },
    F3: {
      frequencyHz: 2590.0,  // Nasal timber resonance
      bandwidthHz: 172.0,
      gainDb: -10.2,
      qFactor: 2590.0 / 172.0 // 15.06
    },
    F4: {
      frequencyHz: 3740.0,  // Cranial resonance
      bandwidthHz: 242.0,
      gainDb: -15.8,
      qFactor: 3740.0 / 242.0 // 15.45
    }
  }
};

export default {
  KADY_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency
};
