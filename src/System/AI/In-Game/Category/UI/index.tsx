/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
export * from "./Opossum_Selection_Screen";
export * from "./Play_Area";
export * from "./Learn_Game_Sounds";

import { UIAIGeneralConfig } from "./General";
import * as OpossumSelectionScreenAI from "./Opossum_Selection_Screen";
import * as PlayAreaAI from "./Play_Area";
import * as LearnGameSoundsAI from "./Learn_Game_Sounds";

export const UIAI = {
  General: UIAIGeneralConfig,
  OpossumSelectionScreen: OpossumSelectionScreenAI,
  PlayArea: PlayAreaAI,
  LearnGameSounds: LearnGameSoundsAI
};
