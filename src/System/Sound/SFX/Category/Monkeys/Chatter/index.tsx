/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playMonkeyChatterSFX } from "./General";

export * from "./General";
export { playMonkeyChatterSFX } from "./General";

/**
 * Procedural Curious Chirp Burst:
 * Rapid descending micro-pitch vocal inflections.
 */
export const playMonkeyCuriousChirp = (
  context: AudioContext,
  destination: AudioNode,
  pitchOffsetRatio: number = 0.0
) => {
  return playMonkeyChatterSFX(context, destination, pitchOffsetRatio, "high_curious_chatter");
};

/**
 * Procedural Playful Trill Giggle:
 * Vibrato frequency-modulated high trills.
 */
export const playMonkeyTrillGiggle = (
  context: AudioContext,
  destination: AudioNode,
  pitchOffsetRatio: number = 0.0
) => {
  return playMonkeyChatterSFX(context, destination, pitchOffsetRatio, "playful_screech");
};

/**
 * Procedural Excited Troop Gibber:
 * Multi-harmonic playful social chatter.
 */
export const playMonkeyExcitedGibber = (
  context: AudioContext,
  destination: AudioNode,
  pitchOffsetRatio: number = 0.0
) => {
  return playMonkeyChatterSFX(context, destination, pitchOffsetRatio, "alert_canopy_call");
};
