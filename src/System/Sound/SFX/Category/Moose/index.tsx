/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playSnortSFX, playAggressiveChargeHuff, playAlertPuff } from "./Snort";
import { playBellowSFX, playDeepBullBellow, playCowMatingCall } from "./Bellow";
import { playGruntSFX, playThroatPuffGrunt, playCautionaryDoubleGrunt } from "./Grunt";
import { playMooseSmash } from "./Smash";
import { playMooseChargeTrample } from "./Trample_Charge";
import { playMooseHoofClick } from "./Hoofstep";
import { playMooseJump } from "./Jump";

export * from "./Variable";
export * from "./Snort";
export * from "./Bellow";
export * from "./Grunt";
export * from "./Smash";
export * from "./Trample_Charge";
export * from "./Hoofstep";
export * from "./Jump";

export type MooseSoundType =
  | "snort"
  | "bellow"
  | "grunt"
  | "moo"
  | "smash"
  | "trample"
  | "jump"
  | "hoofstep"
  | "deep_bull_bellow"
  | "cow_mating_call"
  | "aggressive_charge_huff";

/**
 * Universal Moose Sound Dispatcher:
 * Synthesizes any moose sound module using offline Web Audio oscillators.
 */
export const playMooseVocalization = (
  type: MooseSoundType,
  context: AudioContext,
  destination: AudioNode,
  options: { pitchMultiplier?: number; volume?: number; mooseType?: "Bull" | "Cow"; distance?: number } = {}
) => {
  const now = context.currentTime;
  const mult = options.pitchMultiplier ?? 1.0;
  const vol = options.volume;
  const isBull = options.mooseType !== "Cow";

  switch (type) {
    case "snort":
      return playSnortSFX(context, destination);
    case "aggressive_charge_huff":
      return playAggressiveChargeHuff(context, destination, now, { pitchMultiplier: mult, volume: vol });
    case "bellow":
      return playBellowSFX(context, destination);
    case "deep_bull_bellow":
      return playDeepBullBellow(context, destination, now, { pitchMultiplier: mult, volume: vol });
    case "cow_mating_call":
    case "moo":
      return playCowMatingCall(context, destination, now, { pitchMultiplier: mult, volume: vol });
    case "grunt":
      return playGruntSFX(context, destination);
    case "smash":
      return playMooseSmash(context, destination, now, { type: isBull ? "Bull" : "Cow", volume: vol });
    case "trample":
      return playMooseChargeTrample(context, destination, now, { volume: vol });
    case "jump":
      return playMooseJump(context, destination, now, { pitch: mult, volume: vol, type: isBull ? "Bull" : "Cow" });
    case "hoofstep":
      return playMooseHoofClick(context, destination, now, { type: isBull ? "Bull" : "Cow", distance: options.distance ?? 0, volume: vol });
    default:
      return playGruntSFX(context, destination);
  }
};
