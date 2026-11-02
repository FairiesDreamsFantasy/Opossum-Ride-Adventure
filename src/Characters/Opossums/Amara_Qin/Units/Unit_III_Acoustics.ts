/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * AMARA QIN - UNIT III: ACOUSTICS & VOCALIZATION SYNTHESIS
 * ============================================================================
 * Biomechanical acoustics, formant frequency modeling (F0-F4), biquad filter
 * transfer functions, and Web Audio DSP parameters for Amara Qin's chatter.
 *
 * Vocal Profile:
 * - Fundamental Frequency Range (F0): 500.0 Hz - 1400.0 Hz (0% shift relative to Amara baseline)
 * - Start Frequency: 1400.0 Hz
 * - End Frequency: 500.0 Hz
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
 * Amara Qin's calibrated acoustic vocalization profile.
 */
export const AMARA_QIN_ACOUSTICS: AcousticVocalProfile = {
  name: "Amara Qin",
  id: "amara_qin",
  pitchOffsetRatio: 0.000000000000,
  startFrequencyHz: 1400.0,
  endFrequencyHz: 500.0,
  chirpCount: 6,
  chirpDurationSeconds: 0.040,
  chirpSpacingSeconds: 0.080,
  peakGain: 0.200,
  carrierWaveform: "sawtooth",
  formants: {
    F0: {
      frequencyHz: 500.0,
      bandwidthHz: 50.0,
      gainDb: 0.0,
      qFactor: 500.0 / 50.0
    },
    F1: {
      frequencyHz: 820.0,
      bandwidthHz: 85.0,
      gainDb: -3.0,
      qFactor: 820.0 / 85.0
    },
    F2: {
      frequencyHz: 1800.0,
      bandwidthHz: 125.0,
      gainDb: -5.5,
      qFactor: 1800.0 / 125.0
    },
    F3: {
      frequencyHz: 2850.0,
      bandwidthHz: 190.0,
      gainDb: -10.5,
      qFactor: 2850.0 / 190.0
    },
    F4: {
      frequencyHz: 4000.0,
      bandwidthHz: 260.0,
      gainDb: -16.0,
      qFactor: 4000.0 / 260.0
    }
  }
};

export default {
  AMARA_QIN_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency
};
