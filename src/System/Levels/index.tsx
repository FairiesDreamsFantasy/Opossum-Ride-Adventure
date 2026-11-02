/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SystemLevelGeneralConfig } from "./General";
import { SystemLevelEngine } from "./Engine";

export * from "./General";
export * from "./Engine";

/**
 * System Levels Subsystem Coordinator
 * 
 * Unifies the Level Difficulty Engine, Time-of-Day clock, Parallax Offset calculators,
 * and standard difficulty calibrations under the 75,000,000,000% Standard.
 */
export const SystemLevels = {
  Config: SystemLevelGeneralConfig,
  Engine: SystemLevelEngine,
  getDifficulty: (levelIndex: number) => SystemLevelEngine.calculateDifficultyModifier(levelIndex),
  getParallax: (scrollX: number, layer: number) => SystemLevelEngine.calculateParallaxOffset(scrollX, layer),
  getDayCycle: (elapsed: number) => SystemLevelEngine.calculateDayNightCyclePercentage(elapsed)
};
