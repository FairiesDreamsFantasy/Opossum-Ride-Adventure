/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiRegistryGeneral } from "./General";
import { GeminiRegistryData } from "./Data";
import { GeminiRegistryEngine } from "./Engine";
import { GeminiRegistryCharacters } from "./Characters";
import { GeminiRegistryArena } from "./Arena";
import { GeminiRegistryWorld } from "./World";
import { GeminiRegistrySound } from "./Sound";
import { GeminiRegistryVisuals } from "./Visuals";
import { GeminiRegistryInput } from "./Input";
import { GeminiRegistryBuildingBlocks } from "./Building_Blocks";
import { GeminiRegistryUI } from "./UI";
import { RegistryWildcardL1 } from "./_Wildcard_";

export const GeminiRegistry = {
  General: GeminiRegistryGeneral,
  Data: GeminiRegistryData,
  Engine: GeminiRegistryEngine,
  Characters: GeminiRegistryCharacters,
  Arena: GeminiRegistryArena,
  World: GeminiRegistryWorld,
  Sound: GeminiRegistrySound,
  Visuals: GeminiRegistryVisuals,
  Input: GeminiRegistryInput,
  BuildingBlocks: GeminiRegistryBuildingBlocks,
  UI: GeminiRegistryUI,
  Wildcard: RegistryWildcardL1,
  systemName: "Gemini AI Registry Subsystem"
};

export default GeminiRegistry;
