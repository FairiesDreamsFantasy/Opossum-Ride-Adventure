/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
export * from "./Movement";
export * from "./Snuffle";
export * from "./Chuff";
export * from "./Click";

import { playCompactOpossumMovement } from "./Movement";
import { playCompactOpossumSnuffle } from "./Snuffle";
import { playCompactOpossumChuff } from "./Chuff";
import { playCompactOpossumClick } from "./Click";
import { CompactOpossumSFXConfig } from "./General";

/**
 * Master procedural compact sound synthesizer dispatcher.
 * Dispatches dedicated procedural sound modules (Movement, Snuffle, Chuff, Click).
 */
export function playCompactOpossumSound(type: "snuffle" | "chuff" | "click" | "stridePant" = "chuff", pitchMultiplier = 1.0) {
  switch (type) {
    case "snuffle":
      playCompactOpossumSnuffle(pitchMultiplier);
      break;
    case "chuff":
      playCompactOpossumChuff(pitchMultiplier);
      break;
    case "click":
      playCompactOpossumClick(pitchMultiplier);
      break;
    case "stridePant":
      playCompactOpossumMovement("stridePant", pitchMultiplier);
      break;
    default:
      playCompactOpossumChuff(pitchMultiplier);
      break;
  }
}

export const CompactOpossumAudio = {
  Config: CompactOpossumSFXConfig,
  playSound: playCompactOpossumSound,
  playMovement: playCompactOpossumMovement,
  playSnuffle: playCompactOpossumSnuffle,
  playChuff: playCompactOpossumChuff,
  playClick: playCompactOpossumClick
};
