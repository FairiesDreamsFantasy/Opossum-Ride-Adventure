/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemLevelConfigModel {
  standardGravityDivisor: number;
  baseRiderSpeed: number;
  baseParallaxMultiplier: number;
  maxDayDurationSeconds: number;
  difficultyScalingFactor: number;
  collisionTolerancePixels: number;
  standardHeightCalibrator: number;
  linterRulePrefix: string;
}

export const SystemLevelGeneralConfig: SystemLevelConfigModel = {
  standardGravityDivisor: 9.80665,
  baseRiderSpeed: 15.0,
  baseParallaxMultiplier: 0.25,
  maxDayDurationSeconds: 600,
  difficultyScalingFactor: 1.15,
  collisionTolerancePixels: 8,
  standardHeightCalibrator: 5.3, // Match Melissa/Ashley base shoulder heights
  linterRulePrefix: "LEVELS_ENGINE_RULE_"
};
