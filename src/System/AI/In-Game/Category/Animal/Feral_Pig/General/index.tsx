/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeralPigBehaviorEngine, FeralPigBehaviorState } from "../Behaviors";
import { FeralPigNavigator, ArenaNavigationBounds } from "../Navigation";
import { FeralPigCollisionDetector } from "../Collision";

export class FeralPigAIController {
  public static Behaviors = FeralPigBehaviorEngine;
  public static Navigation = FeralPigNavigator;
  public static Collision = FeralPigCollisionDetector;

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
