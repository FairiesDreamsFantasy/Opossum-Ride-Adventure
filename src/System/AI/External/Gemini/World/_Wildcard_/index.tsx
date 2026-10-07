/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiWorldGeneral } from "../General";
import { GeminiWorldData } from "../Data";
import { GeminiLevels } from "../Levels";

export const WorldWildcard = {
  General: GeminiWorldGeneral,
  Data: GeminiWorldData,
  Levels: GeminiLevels,
  systemName: "Gemini World Integration Module"
};

export * from "../Data";
