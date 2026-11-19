/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimalItem } from "../../../../../../../types";
import { FeralPigBehaviorEngine, FeralPigBehaviorState, DEFAULT_FERAL_PIG_BEHAVIOR_CONFIG } from "../Behaviors";
import { FeralPigNavigator, ArenaNavigationBounds } from "../Navigation";
import { FeralPigCollisionDetector } from "../Collision";

export class FeralPigAIController {
  public static Behaviors = FeralPigBehaviorEngine;
  public static Navigation = FeralPigNavigator;
  public static Collision = FeralPigCollisionDetector;

  /**
   * Level-scaled unpredictable AI tick for feral pigs on path-based arenas (-1 Left, 0 Center, 1 Right).
   * Pigs can randomly switch between ANY lane, charge/evade based on level difficulty (Level 1 -> Level 40),
   * and recover cleanly after stun timers expire.
   */
  public static updateCoursePigAI(
    animal: AnimalItem,
    playerZ: number,
    playerVisualX: number,
    levelId: number,
    deltaSec: number,
    nowMs: number
  ): { switchedLane: boolean; distanceToPlayer: number; recoveredFromStun: boolean } {
    if (animal.state === "smashed") {
      return { switchedLane: false, distanceToPlayer: Math.abs(animal.z - playerZ), recoveredFromStun: false };
    }

    const gender: "Boar" | "Sow" = animal.gender === "Sow" ? "Sow" : "Boar";
    const difficulty = FeralPigBehaviorEngine.computeLevelDifficulty(levelId);
    const zDistance = Math.abs(animal.z - playerZ);
    const pigWorldX = animal.lane * 4 + (animal.xOffset || 0);
    const lateralDist = Math.abs(pigWorldX - playerVisualX);
    const dist3D = Math.sqrt(zDistance * zDistance + lateralDist * lateralDist);

    // 1. Stunned state recovery handling
    if (animal.state === "stunned") {
      animal.behaviorState = "stunned";
      // Ease remaining xOffset smoothly so stunned pig stays grounded in its lane
      if (animal.xOffset && Math.abs(animal.xOffset) > 0.02) {
        animal.xOffset *= Math.max(0, 1 - deltaSec * 4);
      }
      if (animal.stunnedUntil && nowMs >= animal.stunnedUntil) {
        animal.state = "patrolling";
        animal.behaviorState = "patrolling";
        animal.stunnedUntil = undefined;
        animal.nextLaneSwitchTime = 1.2 + Math.random() * 1.8;
        return { switchedLane: false, distanceToPlayer: zDistance, recoveredFromStun: true };
      }
      return { switchedLane: false, distanceToPlayer: zDistance, recoveredFromStun: false };
    }

    // 2. Smoothly decay lateral lane interpolation offset toward target lane center (xOffset -> 0)
    const config = DEFAULT_FERAL_PIG_BEHAVIOR_CONFIG[gender];
    const agilityFactor = gender === "Sow" ? 1.25 : 1.0;
    const laneSlideRate = (4.8 + difficulty * 6.2) * agilityFactor;
    if (animal.xOffset !== undefined && Math.abs(animal.xOffset) > 0.01) {
      const sign = Math.sign(animal.xOffset);
      const step = Math.min(Math.abs(animal.xOffset), laneSlideRate * deltaSec);
      animal.xOffset -= sign * step;
      if (Math.abs(animal.xOffset) < 0.02) animal.xOffset = 0;
    }

    // 3. Evaluate behavior state using level-scaled sensory threshold
    const scaledDetectionDist = (16 + difficulty * 44) * (gender === "Sow" ? 1.15 : 1.0);
    const currentBehavior: FeralPigBehaviorState = animal.behaviorState || "patrolling";
    animal.stateElapsedMs = (animal.stateElapsedMs || 0) + deltaSec * 1000;

    if (zDistance < scaledDetectionDist) {
      animal.behaviorState = gender === "Boar" ? "charging" : (zDistance < scaledDetectionDist * 0.5 ? "evading" : "alert");
    } else if (currentBehavior === "charging" || currentBehavior === "evading" || currentBehavior === "alert") {
      animal.behaviorState = "patrolling";
      animal.stateElapsedMs = 0;
    } else {
      const nextRes = FeralPigBehaviorEngine.evaluateBehaviorState(
        currentBehavior,
        dist3D + 200, // Keep ambient patrol/root cycle outside direct close charge
        animal.stateElapsedMs,
        gender,
        animal.id + Math.floor(nowMs * 0.001),
        config
      );
      if (nextRes.nextState !== animal.behaviorState) {
        animal.behaviorState = nextRes.nextState;
        animal.stateElapsedMs = 0;
      }
    }
    animal.state = animal.behaviorState || "patrolling";

    // 4. Longitudinal movement on track: Boars charge toward player on close levels; active pigs roam slightly
    if (animal.behaviorState === "charging" && animal.z > playerZ) {
      const chargeSpeed = (1.8 + difficulty * 5.2) * config.chargeSpeedMultiplier;
      animal.z -= chargeSpeed * deltaSec;
    } else if (animal.behaviorState === "evading") {
      const evadeSpeed = (1.2 + difficulty * 3.0) * config.chargeSpeedMultiplier;
      animal.z += evadeSpeed * deltaSec * (animal.z >= playerZ ? 1 : -1);
    }

    // 5. Level-scaled unpredictable lane switching across ANY lane (-1, 0, 1)
    if (animal.nextLaneSwitchTime === undefined) {
      // Initial staggered delay scaled down cleanly with higher levels
      const maxInitDelay = 5.0 - difficulty * 3.2;
      animal.nextLaneSwitchTime = 0.6 + Math.random() * Math.max(0.8, maxInitDelay);
    }

    let switchedLane = false;
    animal.nextLaneSwitchTime -= deltaSec;
    if (animal.nextLaneSwitchTime <= 0) {
      // Re-arm timer: easiest levels wait ~3.8-6.0s; hardest levels wait ~0.85-1.9s
      const minInterval = 2.6 - difficulty * 1.75; // 2.6s -> 0.85s
      const spanInterval = 3.2 - difficulty * 2.05; // 3.2s -> 1.15s
      animal.nextLaneSwitchTime = minInterval + Math.random() * spanInterval;

      // Only actively dash across lanes when reasonably near encounter zone (or ahead of player)
      if (zDistance < 95) {
        const switchProb = (0.18 + difficulty * 0.68) * (gender === "Sow" ? 1.12 : 1.0);
        if (Math.random() < Math.min(0.92, switchProb)) {
          const allLanes = [-1, 0, 1].filter((l) => l !== animal.lane);
          const chosenLane = allLanes[Math.floor(Math.random() * allLanes.length)];

          if (chosenLane !== undefined && chosenLane !== animal.lane) {
            const currentWorldX = animal.lane * 4 + (animal.xOffset || 0);
            animal.lane = chosenLane;
            animal.targetLane = chosenLane;
            // Preserve seamless world X so the pig smoothly runs/darts across all lanes
            animal.xOffset = currentWorldX - chosenLane * 4;
            switchedLane = true;
          }
        }
      }
    }

    return { switchedLane, distanceToPlayer: zDistance, recoveredFromStun: false };
  }

  /**
   * Complete tick update method for in-game feral pig instances
   */
  public static updatePigAI(
    pig: {
      x: number;
      y: number;
      z: number;
      speed: number;
      direction: 1 | -1;
      behaviorState: FeralPigBehaviorState;
      stateElapsedMs: number;
      gender: "Boar" | "Sow";
      isSmashed: boolean;
    },
    player: { x: number; y: number; z: number; vy: number },
    bounds: ArenaNavigationBounds,
    deltaSec: number,
    currentTimeMs: number,
    seed: number
  ) {
    if (pig.isSmashed) return pig;

    // 1. Calculate distance to player
    const distToPlayer = Math.sqrt(
      Math.pow(player.x - pig.x, 2) + Math.pow(player.y - pig.y, 2)
    );

    // 2. Check for jump smash impact
    const isSmashHit = FeralPigCollisionDetector.checkJumpSmashHit(
      player.x, player.y, player.z, player.vy,
      pig.x, pig.y, pig.z
    );

    if (isSmashHit) {
      pig.isSmashed = true;
      pig.behaviorState = "smashed";
      return pig;
    }

    // 3. State update
    const { nextState, shouldChangeDirection } = FeralPigBehaviorEngine.evaluateBehaviorState(
      pig.behaviorState,
      distToPlayer,
      pig.stateElapsedMs,
      pig.gender,
      seed
    );

    if (nextState !== pig.behaviorState) {
      pig.behaviorState = nextState;
      pig.stateElapsedMs = 0;
    } else {
      pig.stateElapsedMs += deltaSec * 1000;
    }

    if (shouldChangeDirection) {
      pig.direction = (pig.direction === 1 ? -1 : 1) as 1 | -1;
    }

    // 4. Positional navigation
    const { nextX, nextY, nextDirection } = FeralPigNavigator.computeNextPosition(
      pig.x, pig.y, pig.speed, pig.direction,
      pig.behaviorState, bounds, deltaSec
    );

    pig.x = nextX;
    pig.y = nextY;
    pig.direction = nextDirection;

    return pig;
  }
}
