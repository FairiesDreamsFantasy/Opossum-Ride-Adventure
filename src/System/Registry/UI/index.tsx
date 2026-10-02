/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumSelectionScreenRegistry } from "./Opossum_Selection_Screen";
import { CharacterSelectionScreenRegistry } from "./Character_Selection_Screen";
import { PlayAreaRegistry } from "./Play_Area";
import { MobilePortrait4PhoneRegistry } from "./Play_Area/Mobile_Portrait_4_Phone";
import { LearnGameSoundsRegistry } from "./Learn_Game_Sounds";

export * from "./Opossum_Selection_Screen";
export * from "./Character_Selection_Screen";
export * from "./Play_Area";
export * from "./Learn_Game_Sounds";

export const UIRegistry = {
  name: "System UI Registry",
  description: "Registry for user interface components and layouts",
  timestamp: new Date().toISOString(),
  selectionScreen: OpossumSelectionScreenRegistry,
  characterSelectionScreen: CharacterSelectionScreenRegistry,
  playArea: PlayAreaRegistry,
  mobilePortrait4Phone: MobilePortrait4PhoneRegistry,
  learnGameSounds: LearnGameSoundsRegistry
};
