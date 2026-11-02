/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SystemLevelEngine } from "../../../Levels/Engine";

export const LevelsEngineRegistry = {
  id: "levels_engine_registry",
  name: "Levels Engine Registry",
  module: "System/Registry/Levels/Engine",
  Engine: SystemLevelEngine,
  getDifficulty: (levelIndex: number) => SystemLevelEngine.calculateDifficultyModifier(levelIndex),
  getParallax: (scrollX: number, layer: number) => SystemLevelEngine.calculateParallaxOffset(scrollX, layer),
  getDayCycle: (elapsed: number) => SystemLevelEngine.calculateDayNightCyclePercentage(elapsed),
  getScale: (height: number) => SystemLevelEngine.calculateScaleRatio(height),
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
