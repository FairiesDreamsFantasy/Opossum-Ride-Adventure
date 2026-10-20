/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playMonkeyChatterSFX } from "./Chatter";
import {
  playMonkeyScreech,
  playMonkeyHoot,
  playMonkeyPantHoot,
  playMonkeyAlarmCall,
  playMonkeyCooCall
} from "./Vocalization";
import { playMonkeyJump } from "./Jump";

export * from "./Chatter";
export * from "./Vocalization";
export * from "./Jump";
export * from "./Variable";

export type MonkeySoundType =
  | "chatter"
  | "screech"
  | "hoot"
  | "pant_hoot"
  | "alarm"
  | "coo"
  | "jump"
  | "curious_chirp"
  | "trill_giggle";

/**
 * Universal Monkey Sound Dispatcher:
 * Dynamically synthesizes the requested monkey sound using offline Web Audio oscillators.
 */
export const playMonkeyVocalization = (
  type: MonkeySoundType,
  context: AudioContext,
  destination: AudioNode,
  options: { pitchOffset?: number; volume?: number; presetKey?: string } = {}
) => {
  const now = context.currentTime;
  const pitchOffset = options.pitchOffset ?? 0.0;
  const volume = options.volume;

  switch (type) {
    case "chatter":
    case "curious_chirp":
      return playMonkeyChatterSFX(context, destination, pitchOffset, options.presetKey || "high_curious_chatter");
    case "trill_giggle":
      return playMonkeyChatterSFX(context, destination, pitchOffset, "playful_screech");
    case "screech":
      return playMonkeyScreech(context, destination, now, {
        baseFreq: 1250 * (1 + pitchOffset),
        volume
      });
    case "hoot":
      return playMonkeyHoot(context, destination, now, {
        pitchHz: 680 * (1 + pitchOffset),
        volume
      });
    case "pant_hoot":
      return playMonkeyPantHoot(context, destination, now, {
        baseFreq: 620 * (1 + pitchOffset),
        volume
      });
    case "alarm":
      return playMonkeyAlarmCall(context, destination, now, {
        pitchHz: 1750 * (1 + pitchOffset),
        volume
      });
    case "coo":
      return playMonkeyCooCall(context, destination, now, {
        pitchHz: 980 * (1 + pitchOffset),
        volume
      });
    case "jump":
      return playMonkeyJump(context, destination, now, {
        pitch: 1 + pitchOffset,
        volume
      });
    default:
      return playMonkeyChatterSFX(context, destination, pitchOffset);
  }
};
