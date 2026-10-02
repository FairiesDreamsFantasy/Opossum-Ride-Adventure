/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiObstaclesGeneral } from "../General";
import { GeminiObstaclesData } from "../Data";
import { GeminiObstaclesAnimations } from "../Animations";

export const ObstaclesWildcard = {
  General: GeminiObstaclesGeneral,
  Data: GeminiObstaclesData,
  Animations: GeminiObstaclesAnimations,
  systemName: "Gemini Obstacles Subsystem"
};

export * from "../Data";
