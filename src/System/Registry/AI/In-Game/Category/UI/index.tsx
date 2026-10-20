/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
export * from "./Play_Area";
export * from "./Learn_Game_Sounds";

import { RegistryUIAIGeneralConfig } from "./General";
import * as RegistryPlayAreaAI from "./Play_Area";
import * as RegistryLearnGameSoundsAI from "./Learn_Game_Sounds";

export const RegistryUIAI = {
  General: RegistryUIAIGeneralConfig,
  PlayArea: RegistryPlayAreaAI,
  LearnGameSounds: RegistryLearnGameSoundsAI
};
