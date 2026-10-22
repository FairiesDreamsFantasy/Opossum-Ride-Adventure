/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General Audio Synthesis Constraints for Moose Vocalizations
 * Defines guttural pitch bounds, resonant cavity acoustics, and modulation limits.
 */
export const MooseSoundVariableGeneral = {
  sampleRate: 44100 as const,
  bitDepth: 64 as const,
  isBabylonFree: true,
  synthesisEngine: "WebAudioOfflineLowFreqSubHarmonicOscillator",
  vocalizationTypes: ["bellow", "grunt", "snort", "trot_call", "moo"] as const,
  frequencyLimits: {
    minChestResonanceHz: 40.0,
    maxChestResonanceHz: 280.0,
    minFormantFilterHz: 80.0,
    maxFormantFilterHz: 900.0,
  }
};
