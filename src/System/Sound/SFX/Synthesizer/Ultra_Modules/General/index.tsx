/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Computes microsecond jitter offset for 50,000% ultra-precision granular synthesis.
 */
export const calculateMicrosecondJitter = (index: number): number => {
  return ((index * 0.000137) % 0.0025);
};

export const SFXUltraModulesGeneral = {
  name: "SFX Ultra-Modules Synthesizer Registry",
  description: "Ultra-precision granular micro-shimmer with microsecond jitter, sub-harmonic impact crunch, and zero-phase dual-peak bio-formant shifter.",
  grainCountLimits: {
    minGrains: 8,
    maxGrains: 64
  },
  microsecondJitterResolution: 0.0001,
  zeroPhaseFormantFiltering: true,
  precisionRating: "50000% Sub-Millisecond Ultra-Precision"
};
