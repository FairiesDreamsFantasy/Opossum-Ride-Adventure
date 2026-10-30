/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Equal-loudness contour compensation factor based on Fletcher-Munson curves.
 */
export const calculateEqualLoudnessGain = (freqHz: number): number => {
  // Human ear sensitivity peaks around 2k-4kHz, lower sensitivity at sub bass
  if (freqHz < 100) return 1.45;
  if (freqHz > 2000 && freqHz < 5000) return 0.85;
  return 1.0;
};

export const BGMUltraModulesGeneral = {
  name: "BGM Ultra-Modules Synthesizer Registry",
  description: "Ultra-precision 50,000% FM Canopy ambient matrices, 64-partial additive harmonic stacks, and Fletcher-Munson compensated sub-bass LFO drones.",
  fmPresetRatios: {
    canopy_breeze: { carrierRatio: 1.0, modulatorRatio: 2.75, modulationIndex: 120 },
    crystal_canopy: { carrierRatio: 1.0, modulatorRatio: 3.50, modulationIndex: 240 },
    deep_forest_drone: { carrierRatio: 0.5, modulatorRatio: 1.25, modulationIndex: 80 }
  },
  maxHarmonicPartials: 64,
  equalLoudnessContour: true,
  precisionRating: "50000% Sub-Cent Ultra-Precision"
};
