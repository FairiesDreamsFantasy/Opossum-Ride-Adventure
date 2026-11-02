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
  relativePitchVersusSaffronRatio: number;
}

export const DAISY_ROSE_ACOUSTICS: AcousticVocalProfile = {
  startFrequencyHz: 1280.5,
  endFrequencyHz: 443.25,
  pitchOffsetRatio: -0.035, // 1.5% lower than Saffron Rose (-0.020 - 0.015)
  chirpCount: 6,
  chirpSpacingSeconds: 0.08,
  chirpDurationSeconds: 0.04,
  maxVolumeRatio: 0.20,
  waveform: "sawtooth",
  relativePitchVersusSaffronRatio: -0.015 // -1.5% exactly
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
  return DAISY_ROSE_ACOUSTICS.startFrequencyHz + t * (DAISY_ROSE_ACOUSTICS.endFrequencyHz - DAISY_ROSE_ACOUSTICS.startFrequencyHz);
}

export default DAISY_ROSE_ACOUSTICS;
