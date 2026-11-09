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
  relativePitchVersusStaceyRatio: number;
}

export const DALE_JASMINE_ACOUSTICS: AcousticVocalProfile = {
  startFrequencyHz: 1278.6822864,
  endFrequencyHz: 442.6154064,
  pitchOffsetRatio: -0.03642292,
  chirpCount: 6,
  chirpSpacingSeconds: 0.08,
  chirpDurationSeconds: 0.04,
  maxVolumeRatio: 0.20,
  waveform: "sawtooth",
  relativePitchVersusStaceyRatio: 0.00008 // +0.008% exactly
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
  return DALE_JASMINE_ACOUSTICS.startFrequencyHz + t * (DALE_JASMINE_ACOUSTICS.endFrequencyHz - DALE_JASMINE_ACOUSTICS.startFrequencyHz);
}

export default DALE_JASMINE_ACOUSTICS;
