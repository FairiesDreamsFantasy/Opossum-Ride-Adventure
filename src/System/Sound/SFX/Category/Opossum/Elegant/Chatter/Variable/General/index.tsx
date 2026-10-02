/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General Audio Synthesis Constraints for Opossum Elegant Chatter
 * Preserves 64-bit precision and Web Audio API architecture.
 */
export const OpossumChatterVariableGeneral = {
  sampleRate: 44100 as const,
  bitDepth: 64 as const,
  isBabylonFree: true,
  synthesisEngine: "WebAudioOfflineProceduralOscillator",
  pitchRangeBounds: {
    minFreq: 300.0,
    maxFreq: 2400.0,
  },
  timingBounds: {
    minChirpDuration: 0.02,
    maxChirpDuration: 0.12,
    minSpacing: 0.04,
    maxSpacing: 0.16,
  }
};
