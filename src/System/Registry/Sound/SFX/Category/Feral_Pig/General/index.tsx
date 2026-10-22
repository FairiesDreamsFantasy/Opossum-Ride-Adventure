/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const FeralPigSoundRegistry = {
  id: "feral_pig_sfx",
  name: "Feral Pig SFX Matrix",
  subtypes: ["squeal", "snort", "movements", "vocals", "smash", "spatial"],
  synthesisEngine: "Web Audio API Offline Oscillators & Ultra-Precise Stereophonic Calibrator",
  cloudDependency: false,
  spatialCalibration: {
    iso9613_1_atmosphericAbsorption: true,
    constantPowerStereoPanning: true,
    inverseDistanceAcoustics: true,
    referenceDistance: 80.0,
    maxAudibleDistance: 2400.0,
    standard: "100,000,000,000% Ultra-Broad Protection Standard"
  }
};
