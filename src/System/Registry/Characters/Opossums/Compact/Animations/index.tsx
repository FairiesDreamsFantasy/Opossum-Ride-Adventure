/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Dedicated Decoupled Animation Engine for Compact Opossums.
 * Ensures compact opossums are NOT hardcoded to use the same trot system as crafted opossums.
 */
export const CompactOpossumAnimationRegistry = {
  id: "compact_opossum_animation_registry",
  name: "Compact Perched-Forward Trot & Gallop System",
  standard: "100,000,000,000% Ultra-Broad Protection Standard",
  trotKinematics: {
    baseCadenceFrequencyHz: 2.2, // ~1.25x faster than crafted 5-6ft steeds
    spineFlexMaxDegrees: 4.5,    // Tighter spine flex due to compact 5'2" body length
    headPerchPitchDegrees: 18.0, // Constant forward perched head posture
    headBobAmplitudeInches: 1.4, // Subtle horizontal bobbing rather than vertical crest
    strideLengthInches: 24.0,    // Scaled for 3-foot shoulder height
    pawClearanceInches: 3.5,     // Agile, low ground-skimming gait
    lateralRollMaxDegrees: 2.8   // Grounded, low roll stability for short riders
  },
  gallopKinematics: {
    baseCadenceFrequencyHz: 3.6,
    spineFlexMaxDegrees: 7.8,
    headPerchPitchDegrees: 22.0, // Leans further forward into the draft wind
    headBobAmplitudeInches: 2.2,
    strideLengthInches: 42.0
  },
  idleKinematics: {
    breathingCycleSeconds: 1.8,
    earTwitchProbabilityPerSecond: 0.15,
    snoutSnuffleCycleSeconds: 3.2
  }
};

export const CompactAnimationSystem = CompactOpossumAnimationRegistry;
