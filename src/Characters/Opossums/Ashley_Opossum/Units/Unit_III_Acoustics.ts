/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ASHLEY OPOSSUM - UNIT III: ACOUSTICS & PROCEDURAL VOCAL SYNTHESIS
 * ============================================================================
 * Acoustic frequency profile, biquad filter filter-coefficient generator,
 * and harmonic resonance equations for Ashley Opossum's high-energy chatter and SFX.
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

export const ASHLEY_OPOSSUM_ACOUSTICS: AcousticVocalProfile = {
  characterName: "Ashley Opossum",
  fundamentalFrequencyHz: 335.0,
  harmonicFormantsHz: [670.0, 1005.0, 1675.0, 2680.0],
  resonanceQ: 5.9,
  maxAmplitudeDb: -2.9,
  vocalPasselSignature: "Offline Procedural Natural SFX & High-Energy Chatter"
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

export function evaluateChirpFrequency(timeSeconds: number, sweepRateHzSec: number = 29.0): number {
  const base = ASHLEY_OPOSSUM_ACOUSTICS.fundamentalFrequencyHz;
  return base + Math.sin(timeSeconds * sweepRateHzSec * 2.0 * Math.PI) * 82.0;
}

export default ASHLEY_OPOSSUM_ACOUSTICS;
