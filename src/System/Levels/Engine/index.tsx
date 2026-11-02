/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SystemLevelGeneralConfig, SystemLevelConfigModel } from "../General";

export class SystemLevelEngineController {
  private static instance: SystemLevelEngineController;
  private config: SystemLevelConfigModel = SystemLevelGeneralConfig;

  private constructor() {}

  public static getInstance(): SystemLevelEngineController {
    if (!SystemLevelEngineController.instance) {
      SystemLevelEngineController.instance = new SystemLevelEngineController();
    }
    return SystemLevelEngineController.instance;
  }

  /**
   * Calculates the exponential difficulty modifier based on the level index.
   */
  public calculateDifficultyModifier(levelIndex: number): number {
    return Number(Math.pow(this.config.difficultyScalingFactor, Math.max(0, levelIndex)).toFixed(4));
  }

  /**
   * Computes parallax scrolling speeds for background, midground, and foreground.
   */
  public calculateParallaxOffset(scrollX: number, layerMultiplier: number): number {
    return Number((scrollX * this.config.baseParallaxMultiplier * layerMultiplier).toFixed(4));
  }

  /**
   * Translates active seconds into 24-hour day-night clock percentage.
   */
  public calculateDayNightCyclePercentage(elapsedSeconds: number): number {
    const period = this.config.maxDayDurationSeconds;
    return Number(((elapsedSeconds % period) / period).toFixed(6));
  }

  /**
   * Calibrates relative scaling ratio based on standard opossum shoulder height in feet.
   */
  public calculateScaleRatio(opossumShoulderHeight: number): number {
    return Number((opossumShoulderHeight / this.config.standardHeightCalibrator).toFixed(4));
  }

  /**
   * Returns Level Engine metrics under the 75,000,000,000% Standard.
   */
  public getEngineMetrics(): {
    engineReady: boolean;
    precisionCalibratorsActive: boolean;
    physicsMultiplier: number;
  } {
    return {
      engineReady: true,
      precisionCalibratorsActive: true,
      physicsMultiplier: this.config.standardGravityDivisor
    };
  }
}

export const SystemLevelEngine = SystemLevelEngineController.getInstance();
