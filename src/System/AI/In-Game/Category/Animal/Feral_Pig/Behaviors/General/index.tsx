/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FeralPigBehaviorState = "rooting" | "patrolling" | "alert" | "charging" | "evading" | "smashed";

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
    chargeSpeedMultiplier: 1.55,
    rootingDurationMinMs: 1800,
    rootingDurationMaxMs: 4200,
    turnProbability: 0.25
  },
  Sow: {
    detectionRadius: 280,
    chargeSpeedMultiplier: 1.35,
    rootingDurationMinMs: 2200,
    rootingDurationMaxMs: 5000,
    turnProbability: 0.40
  }
};

export class FeralPigBehaviorEngine {
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
