/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
import { FERAL_PIG_SOUND_DEFINITIONS } from "./General";

export const FeralPigSoundRegistry = {
  name: "Feral Pig Sound Category Registry",
  description: "Sound activation mappings for feral pig grunts, snorts, squeals, trotting footfalls, and combat jump smashes.",
  sounds: FERAL_PIG_SOUND_DEFINITIONS,
  count: FERAL_PIG_SOUND_DEFINITIONS.length
};
