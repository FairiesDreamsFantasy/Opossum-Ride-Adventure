/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { resolveOwlBehavior } from "./Owl";
import { FeralPigAIController } from "./Feral_Pig";
import { MonkeyAIController } from "./Monkey";

export * from "./Owl";
export * from "./Feral_Pig";
export * from "./Monkey";
export * from "./Opossum";

/**
 * Animal Behavior Resolver
 * Routes behavior logic based on species and environmental factors.
 */
export function resolveAnimalBehavior(species: string, random: number): { action: string; duration: number } {
  switch (species.toLowerCase()) {
    case "owl":
      return resolveOwlBehavior(random);
    case "feral_pig":
    case "pig":
      return { action: random < 0.5 ? "rooting" : "patrolling", duration: 2500 + random * 2500 };
    case "monkey":
      return { action: random < 0.4 ? "chattering_tease" : (random < 0.7 ? "acrobatic_swing" : "curious_approach"), duration: 1800 + random * 2200 };
    case "frog":
      return { action: "sitting", duration: 2000 + random * 4000 };
    default:
      return { action: "idle", duration: 1000 };
  }
}
