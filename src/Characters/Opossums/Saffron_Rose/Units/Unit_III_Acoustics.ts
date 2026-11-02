/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * SAFFRON ROSE - UNIT III: ACOUSTICS & VOCALIZATION SYNTHESIS
 * ============================================================================
 * Biomechanical acoustics, formant frequency modeling (F0-F4), biquad filter
 * transfer functions, and Web Audio DSP parameters for Saffron Rose's chatter.
 *
 * Vocal Profile:
 * - Fundamental Frequency Range (F0): 441.0 Hz - 1274.0 Hz (-2% shift relative to Melissa)
 * - Start Frequency: 1274.0 Hz (1300 Hz * (1 - 0.02))
 * - End Frequency: 441.0 Hz (450 Hz * (1 - 0.02))
 * - Chirp Count: 6 chirps per elegant chatter burst
 * - Inter-chirp Spacing: 80 ms (0.08 s)
 * - Chirp Duration: 40 ms (0.04 s)
 * - Peak Amplitude Volume: 0.196 (-2% offset from 0.200)
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
    F0: FormantBand; // Fundamental pitch trajectory
    F1: FormantBand; // First pharyngeal formant
    F2: FormantBand; // Second oral cavity formant
    F3: FormantBand; // Third nasal/dental formant
    F4: FormantBand; // Fourth cranial resonance formant
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
 * Computes digital biquad bandpass filter coefficients (constant 0 dB peak gain)
 * given center frequency (fc), quality factor (Q), and sampling frequency (fs).
 * H(s) = ( (w0/Q)*s ) / ( s^2 + (w0/Q)*s + w0^2 )
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
 * Evaluates exponential downward chirp frequency sweep:
 * f(t) = f_start * (f_end / f_start)^(t / duration)
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
 * Saffron Rose's calibrated acoustic vocalization profile.
 */
export const SAFFRON_ROSE_ACOUSTICS: AcousticVocalProfile = {
  name: "Saffron Rose",
  id: "saffron_rose",
  pitchOffsetRatio: -0.02,
  startFrequencyHz: 1274.0, // 1300 * (1 - 0.02)
  endFrequencyHz: 441.0,    // 450 * (1 - 0.02)
  chirpCount: 6,
  chirpDurationSeconds: 0.040,
  chirpSpacingSeconds: 0.080,
  peakGain: 0.196,          // 0.20 * (1 - 0.02)
  carrierWaveform: "sawtooth",
  formants: {
    F0: {
      frequencyHz: 441.0,
      bandwidthHz: 45.0,
      gainDb: 0.0,
      qFactor: 441.0 / 45.0 // ~9.8
    },
    F1: {
      frequencyHz: 784.0,   // G5 resonant pharyngeal tract
      bandwidthHz: 80.0,
      gainDb: -3.5,
      qFactor: 784.0 / 80.0 // 9.8
    },
    F2: {
      frequencyHz: 1760.0,  // A6 oral front cavity resonance
      bandwidthHz: 120.0,
      gainDb: -6.0,
      qFactor: 1760.0 / 120.0 // 14.67
    },
    F3: {
      frequencyHz: 2793.8,  // F7 nasal-palatal resonance
      bandwidthHz: 180.0,
      gainDb: -11.0,
      qFactor: 2793.8 / 180.0 // 15.52
    },
    F4: {
      frequencyHz: 3951.0,  // B7 high cranial sparkle
      bandwidthHz: 250.0,
      gainDb: -16.5,
      qFactor: 3951.0 / 250.0 // 15.80
    }
  }
};

export default {
  SAFFRON_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency
};
