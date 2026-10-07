/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General Audio Synthesis Constraints for Monkey Vocalizations & Chatters
 * Defines high-frequency chatter bursts, pitch agility, and envelope curves.
 */
export const MonkeySoundVariableGeneral = {
  sampleRate: 44100 as const,
  bitDepth: 64 as const,
  isBabylonFree: true,
  synthesisEngine: "WebAudioOfflineHighFreqBurstOscillator",
  vocalizationCategories: ["chatter", "screech", "hoot", "curious_call"] as const,
  frequencyLimits: {
    minFreqHz: 450.0,
    maxFreqHz: 4200.0,
    minBurstCount: 2,
    maxBurstCount: 12,
  }
};
