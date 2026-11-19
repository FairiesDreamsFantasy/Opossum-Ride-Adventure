/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PseudorandomGenerator } from "../../../../Psudorandom_Functions";

export type FeralPigBehaviorState = "rooting" | "patrolling" | "alert" | "charging" | "evading" | "stunned" | "smashed";
export type FeralPigGaitMode = "walk" | "trot" | "gallop" | "charge";

export interface FeralPigBehaviorParams {
  detectionRadius: number;
  alertRadius: number;
  chargeSpeedMultiplier: number;
  rootingDurationMinMs: number;
  rootingDurationMaxMs: number;
  patrolDurationMinMs: number;
  patrolDurationMaxMs: number;
  turnProbability: number;
}

export const DEFAULT_FERAL_PIG_BEHAVIOR_CONFIG: Record<"Boar" | "Sow", FeralPigBehaviorParams> = {
  Boar: {
    detectionRadius: 28,
    alertRadius: 48,
    chargeSpeedMultiplier: 1.45,
    rootingDurationMinMs: 1600,
    rootingDurationMaxMs: 3600,
    patrolDurationMinMs: 2800,
    patrolDurationMaxMs: 5400,
    turnProbability: 0.32
  },
  Sow: {
    detectionRadius: 24,
    alertRadius: 52,
    chargeSpeedMultiplier: 1.28,
    rootingDurationMinMs: 1800,
    rootingDurationMaxMs: 3800,
    patrolDurationMinMs: 3000,
    patrolDurationMaxMs: 5800,
    turnProbability: 0.44
  }
};

export class FeralPigBehaviorEngine {
  /**
   * Computes continuous difficulty factor [0.08 .. 1.0] across World 1 (Levels 1-40) and maintains peak/scaled difficulty in World 2+.
   */
  public static computeLevelDifficulty(levelId: number, worldId: number = 1): number {
    const cumulativeStage = worldId > 1 ? 40 + Math.max(0, levelId) : Math.max(1, levelId);
    const clampedStage = Math.min(40, cumulativeStage);
    return parseFloat((0.08 + ((clampedStage - 1) / 39) * 0.92).toFixed(4));
  }

  /**
   * Classifies physical movement gait from live speed (m/s) and state.
   */
  public static resolveGaitForMotion(behaviorState: FeralPigBehaviorState, speedMetersPerSec: number): FeralPigGaitMode {
    if (behaviorState === "charging") {
      return speedMetersPerSec >= 6.8 ? "charge" : "gallop";
    }
    if (behaviorState === "evading") {
      return speedMetersPerSec >= 5.2 ? "gallop" : "trot";
    }
    if (behaviorState === "rooting" || speedMetersPerSec < 2.2) {
      return "walk";
    }
    if (speedMetersPerSec < 5.0) {
      return "trot";
    }
    return "gallop";
  }

  /**
   * Computes next state transition via calibrated sensory distance radii and deterministic PRNG.
   */
  public static evaluateBehaviorState(
    currentState: FeralPigBehaviorState,
    distanceToPlayer: number,
    stateElapsedMs: number,
    gender: "Boar" | "Sow",
    rngSeed: number,
    config: FeralPigBehaviorParams = DEFAULT_FERAL_PIG_BEHAVIOR_CONFIG[gender],
    levelDifficulty: number = 0.25
  ): { nextState: FeralPigBehaviorState; shouldChangeDirection: boolean } {
    if (currentState === "smashed") {
      return { nextState: "smashed", shouldChangeDirection: false };
    }
    if (currentState === "stunned") {
      return { nextState: "stunned", shouldChangeDirection: false };
    }

    const scaledDetect = config.detectionRadius * (0.75 + levelDifficulty * 0.85);
    const scaledAlert = config.alertRadius * (0.8 + levelDifficulty * 0.7);
    const rng = new PseudorandomGenerator(Math.abs(Math.floor(rngSeed)) + 17);

    // 1. Direct engagement radius
    if (distanceToPlayer <= scaledDetect) {
      if (gender === "Boar") {
        return { nextState: "charging", shouldChangeDirection: false };
      }
      return {
        nextState: distanceToPlayer < scaledDetect * 0.72 ? "evading" : "alert",
        shouldChangeDirection: currentState !== "evading"
      };
    }

    // 2. Outer alert/vigilance band
    if (distanceToPlayer <= scaledAlert) {
      if (currentState === "charging" && gender === "Boar" && stateElapsedMs < 1400) {
        return { nextState: "charging", shouldChangeDirection: false };
      }
      if (currentState === "evading" && gender === "Sow" && stateElapsedMs < 1200) {
        return { nextState: "evading", shouldChangeDirection: false };
      }
      return { nextState: "alert", shouldChangeDirection: false };
    }

    // 3. Ambient foraging & active patrolling cycles when outside threat range
    if (currentState === "charging" || currentState === "evading" || currentState === "alert") {
      return { nextState: "patrolling", shouldChangeDirection: true };
    }

    const rootDuration = config.rootingDurationMinMs +
      rng.next() * (config.rootingDurationMaxMs - config.rootingDurationMinMs);
    const patrolDuration = config.patrolDurationMinMs +
      rng.next() * (config.patrolDurationMaxMs - config.patrolDurationMinMs);

    if (currentState === "rooting" && stateElapsedMs >= rootDuration) {
      return { nextState: "patrolling", shouldChangeDirection: rng.next() < config.turnProbability };
    }

    if (currentState === "patrolling" && stateElapsedMs >= patrolDuration) {
      return { nextState: "rooting", shouldChangeDirection: rng.next() < (config.turnProbability * 0.5) };
    }

    return { nextState: currentState, shouldChangeDirection: false };
  }
}
