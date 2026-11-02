/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeralPigBehaviorState } from "../../Behaviors";

export interface ArenaNavigationBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  arenaType: "garden" | "cave" | "orchard" | "farm" | "trail";
}

export class FeralPigNavigator {
  /**
   * Updates positional coordinates dynamically without hardcoding arena constants
   */
  public static computeNextPosition(
    x: number,
    y: number,
    speed: number,
    direction: 1 | -1,
    behaviorState: FeralPigBehaviorState,
    bounds: ArenaNavigationBounds,
    deltaSec: number
  ): { nextX: number; nextY: number; nextDirection: 1 | -1 } {
    if (behaviorState === "smashed" || behaviorState === "rooting" || behaviorState === "alert") {
      // Stationary actions
      return { nextX: x, nextY: y, nextDirection: direction };
    }

    let effectiveSpeed = speed;
    if (behaviorState === "charging") effectiveSpeed *= 1.55;
    if (behaviorState === "evading") effectiveSpeed *= 1.35;

    let nextX = x + (effectiveSpeed * direction * deltaSec * 60);
    let nextDirection = direction;

    // Arena boundary rebound
    if (nextX <= bounds.minX) {
      nextX = bounds.minX;
      nextDirection = 1;
    } else if (nextX >= bounds.maxX) {
      nextX = bounds.maxX;
      nextDirection = -1;
    }

    // Dynamic environmental oscillation (e.g. foraging zig-zags in gardens, wall following in caves)
    let nextY = y;
    if (bounds.arenaType === "garden" && behaviorState === "patrolling") {
      nextY = y + Math.sin(nextX * 0.05) * 0.4;
    }

    return { nextX, nextY, nextDirection };
  }
}
