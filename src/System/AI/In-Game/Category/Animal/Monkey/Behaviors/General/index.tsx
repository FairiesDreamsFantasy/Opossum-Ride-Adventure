/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MonkeyBehaviorState = 
  | "idle_perched" 
  | "curious_approach" 
  | "chattering_tease" 
  | "acrobatic_swing" 
  | "evasive_leap" 
  | "tree_climb";

export interface MonkeyBehaviorConfig {
  curiosityRadius: number;
  threatRadius: number;
  teaseDurationMs: number;
  acrobaticsCadenceSec: number;
  agilityScale: number;
}

export const DEFAULT_MONKEY_BEHAVIOR_CONFIG: MonkeyBehaviorConfig = {
  curiosityRadius: 320,
  threatRadius: 140,
  teaseDurationMs: 2400,
  acrobaticsCadenceSec: 1.8,
  agilityScale: 1.65
};

export class MonkeyBehaviorEngine {
  /**
   * Evaluates deterministic Markov state transitions dynamically without hardcoding
   */
  public static evaluateBehaviorState(
    currentState: MonkeyBehaviorState,
    distanceToPlayer: number,
    stateElapsedMs: number,
    rngSeed: number,
    config: MonkeyBehaviorConfig = DEFAULT_MONKEY_BEHAVIOR_CONFIG
  ): { nextState: MonkeyBehaviorState; agilityModifier: number; triggerChatter: boolean } {
    // Proximity logic
    if (distanceToPlayer <= config.threatRadius) {
      // Immediate evasive leap or climb when encroached upon
      return {
        nextState: (rngSeed % 2 === 0) ? "evasive_leap" : "tree_climb",
        agilityModifier: config.agilityScale * 1.4,
        triggerChatter: true
      };
    }

    if (distanceToPlayer <= config.curiosityRadius) {
      if (currentState === "idle_perched") {
        return {
          nextState: "curious_approach",
          agilityModifier: config.agilityScale,
          triggerChatter: false
        };
      }
      if (currentState === "curious_approach" && stateElapsedMs >= 1800) {
        return {
          nextState: "chattering_tease",
          agilityModifier: 0.8,
          triggerChatter: true
        };
      }
    }

    // Default cyclic ambient states
    if (currentState === "chattering_tease" && stateElapsedMs >= config.teaseDurationMs) {
      return {
        nextState: "acrobatic_swing",
        agilityModifier: config.agilityScale * 1.25,
        triggerChatter: false
      };
    }

    if (currentState === "acrobatic_swing" && stateElapsedMs >= (config.acrobaticsCadenceSec * 1000)) {
      return {
        nextState: "idle_perched",
        agilityModifier: 0.5,
        triggerChatter: false
      };
    }

    if (currentState === "evasive_leap" && stateElapsedMs >= 1200) {
      return {
        nextState: "idle_perched",
        agilityModifier: 0.5,
        triggerChatter: false
      };
    }

    return {
      nextState: currentState,
      agilityModifier: config.agilityScale,
      triggerChatter: false
    };
  }
}
