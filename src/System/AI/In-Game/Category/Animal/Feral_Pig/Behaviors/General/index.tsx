/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FeralPigBehaviorState = "rooting" | "patrolling" | "alert" | "charging" | "evading" | "stunned" | "smashed";

export interface FeralPigBehaviorParams {
  detectionRadius: number;
  chargeSpeedMultiplier: number;
  rootingDurationMinMs: number;
  rootingDurationMaxMs: number;
  turnProbability: number;
}

export const DEFAULT_FERAL_PIG_BEHAVIOR_CONFIG: Record<"Boar" | "Sow", FeralPigBehaviorParams> = {
  Boar: {
    detectionRadius: 240,
    chargeSpeedMultiplier: 1.45,
    rootingDurationMinMs: 1800,
    rootingDurationMaxMs: 4200,
    turnProbability: 0.25
  },
  Sow: {
    detectionRadius: 280,
    chargeSpeedMultiplier: 1.25,
    rootingDurationMinMs: 2200,
    rootingDurationMaxMs: 5000,
    turnProbability: 0.40
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
   * Computes next state transition via dynamic distance calculations and probabilistic timers
   */
  public static evaluateBehaviorState(
    currentState: FeralPigBehaviorState,
    distanceToPlayer: number,
    stateElapsedMs: number,
    gender: "Boar" | "Sow",
    rngSeed: number,
    config: FeralPigBehaviorParams = DEFAULT_FERAL_PIG_BEHAVIOR_CONFIG[gender]
  ): { nextState: FeralPigBehaviorState; shouldChangeDirection: boolean } {
    if (currentState === "smashed") {
      return { nextState: "smashed", shouldChangeDirection: false };
    }
    if (currentState === "stunned") {
      return { nextState: "stunned", shouldChangeDirection: false };
    }

    // Proximity trigger: player nearby
    if (distanceToPlayer <= config.detectionRadius) {
      if (gender === "Boar") {
        // Boars charge aggressively when encroached upon
        return { nextState: "charging", shouldChangeDirection: false };
      } else {
        // Sows assume alert stance or evasive withdrawal
        return { nextState: distanceToPlayer < 120 ? "evading" : "alert", shouldChangeDirection: true };
      }
    }

    // Ambient state cycle when player is far away
    const currentRootDuration = config.rootingDurationMinMs + 
      ((rngSeed * 9301 + 49297) % 233280 / 233280) * (config.rootingDurationMaxMs - config.rootingDurationMinMs);

    if (currentState === "charging" || currentState === "evading" || currentState === "alert") {
      // Revert to patrolling once player leaves sensory boundary
      return { nextState: "patrolling", shouldChangeDirection: false };
    }

    if (currentState === "rooting" && stateElapsedMs >= currentRootDuration) {
      const turnRng = ((rngSeed * 13) % 100) / 100;
      return { nextState: "patrolling", shouldChangeDirection: turnRng < config.turnProbability };
    }

    if (currentState === "patrolling" && stateElapsedMs >= 3500) {
      return { nextState: "rooting", shouldChangeDirection: false };
    }

    return { nextState: currentState, shouldChangeDirection: false };
  }
}
