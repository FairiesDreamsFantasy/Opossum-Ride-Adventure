/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AcousticVocalProfile {
  startFrequencyHz: number;
  endFrequencyHz: number;
  pitchOffsetRatio: number;
  chirpCount: number;
  chirpSpacingSeconds: number;
  chirpDurationSeconds: number;
  maxVolumeRatio: number;
  waveform: "sawtooth" | "square";
  relativePitchVersusDaisyRatio: number;
}

export const CALLIE_ROSE_ACOUSTICS: AcousticVocalProfile = {
  startFrequencyHz: 1279.86,
  endFrequencyHz: 443.03,
  pitchOffsetRatio: -0.0355, // 0.05% lower than Daisy Rose (-0.035 - 0.0005)
  chirpCount: 6,
  chirpSpacingSeconds: 0.08,
  chirpDurationSeconds: 0.04,
  maxVolumeRatio: 0.20,
  waveform: "sawtooth",
  relativePitchVersusDaisyRatio: -0.0005 // -0.05% exactly
};

export function calculateBiquadBandpassCoefficients(centerFreqHz: number, qFactor: number, sampleRateHz: number = 44100) {
  const w0 = (2 * Math.PI * centerFreqHz) / sampleRateHz;
  const alpha = Math.sin(w0) / (2 * qFactor);

  const b0 = alpha;
  const b1 = 0;
  const b2 = -alpha;
  const a0 = 1 + alpha;
  const a1 = -2 * Math.cos(w0);
  const a2 = 1 - alpha;

  return {
    b0: b0 / a0,
    b1: b1 / a0,
    b2: b2 / a0,
    a1: a1 / a0,
    a2: a2 / a0
  };
}

export function evaluateChirpFrequency(progressRatio: number): number {
  const t = Math.max(0, Math.min(1, progressRatio));
  return CALLIE_ROSE_ACOUSTICS.startFrequencyHz + t * (CALLIE_ROSE_ACOUSTICS.endFrequencyHz - CALLIE_ROSE_ACOUSTICS.startFrequencyHz);
}

export default CALLIE_ROSE_ACOUSTICS;
