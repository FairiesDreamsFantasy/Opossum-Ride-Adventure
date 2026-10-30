/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * MELISSA OPOSSUM - UNIT III: ACOUSTICS & PROCEDURAL VOCAL SYNTHESIS
 * ============================================================================
 * Acoustic frequency profile, biquad filter filter-coefficient generator,
 * and harmonic resonance equations for Melissa Opossum's soft chatter and SFX.
 */

export interface AcousticVocalProfile {
  characterName: string;
  fundamentalFrequencyHz: number;
  harmonicFormantsHz: number[];
  resonanceQ: number;
  maxAmplitudeDb: number;
  vocalPasselSignature: string;
}

export interface BiquadCoefficients {
  b0: number;
  b1: number;
  b2: number;
  a0: number;
  a1: number;
  a2: number;
}

export const MELISSA_OPOSSUM_ACOUSTICS: AcousticVocalProfile = {
  characterName: "Melissa Opossum",
  fundamentalFrequencyHz: 315.0,
  harmonicFormantsHz: [630.0, 945.0, 1575.0, 2520.0],
  resonanceQ: 5.5,
  maxAmplitudeDb: -3.2,
  vocalPasselSignature: "Offline Procedural Natural SFX & Soft Chatter Sweeps"
};

export function calculateBiquadBandpassCoefficients(
  centerFrequencyHz: number,
  sampleRateHz: number,
  Q: number
): BiquadCoefficients {
  const w0 = (2.0 * Math.PI * centerFrequencyHz) / sampleRateHz;
  const alpha = Math.sin(w0) / (2.0 * Q);
  const cosW0 = Math.cos(w0);

  const b0 = alpha;
  const b1 = 0.0;
  const b2 = -alpha;
  const a0 = 1.0 + alpha;
  const a1 = -2.0 * cosW0;
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

export function evaluateChirpFrequency(timeSeconds: number, sweepRateHzSec: number = 25.0): number {
  const base = MELISSA_OPOSSUM_ACOUSTICS.fundamentalFrequencyHz;
  return base + Math.sin(timeSeconds * sweepRateHzSec * 2.0 * Math.PI) * 75.0;
}

export default MELISSA_OPOSSUM_ACOUSTICS;
