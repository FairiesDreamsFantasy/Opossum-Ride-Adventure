/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelsRegistryGeneral } from "./General";
import { LevelsEngineRegistry } from "./Engine";
import { SystemLevels } from "../../Levels";

export * from "./General";
export * from "./Engine";

export const LevelsRegistry = {
  General: LevelsRegistryGeneral,
  Engine: LevelsEngineRegistry,
  SystemLevels: SystemLevels,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
