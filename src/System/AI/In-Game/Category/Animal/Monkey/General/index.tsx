/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MonkeyBehaviorEngine, MonkeyBehaviorState, MonkeyBehaviorConfig } from "../Behaviors";
import { MonkeyAcrobaticsEngine } from "../Acrobatics";
import { MonkeyNavigator, MonkeyNavBounds } from "../Navigation";

export class MonkeyAIController {
  public static Behaviors = MonkeyBehaviorEngine;
  public static Acrobatics = MonkeyAcrobaticsEngine;
  public static Navigation = MonkeyNavigator;

  /**
   * Scientific tick loop for in-game monkey instances
   */
  public static updateMonkeyAI(
    monkey: {
      x: number;
      y: number;
      z: number;
      baseSpeed: number;
      direction: 1 | -1;
      behaviorState: MonkeyBehaviorState;
      stateElapsedMs: number;
    },
    player: { x: number; y: number; z: number },
    bounds: MonkeyNavBounds,
    deltaSec: number,
    seed: number
  ) {
    const distToPlayer = Math.sqrt(
      Math.pow(player.x - monkey.x, 2) + Math.pow(player.y - monkey.y, 2) + Math.pow(player.z - monkey.z, 2)
    );

    const { nextState, triggerChatter } = MonkeyBehaviorEngine.evaluateBehaviorState(
      monkey.behaviorState,
      distToPlayer,
      monkey.stateElapsedMs,
      seed
    );

    if (nextState !== monkey.behaviorState) {
      monkey.behaviorState = nextState;
      monkey.stateElapsedMs = 0;
    } else {
      monkey.stateElapsedMs += deltaSec * 1000;
    }

    const { nextX, nextY, nextZ, nextDirection } = MonkeyNavigator.computeNextPosition(
      monkey.x, monkey.y, monkey.z, monkey.baseSpeed, monkey.direction,
      monkey.behaviorState, bounds, deltaSec
    );

    monkey.x = nextX;
    monkey.y = nextY;
    monkey.z = nextZ;
    monkey.direction = nextDirection;

    return {
      monkey,
      triggerChatter
    };
  }
}
