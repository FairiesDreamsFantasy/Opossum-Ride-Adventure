/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MonkeyBehaviorState } from "../../Behaviors";

export interface MonkeyNavBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  canopyHeightZ: number;
  groundHeightZ: number;
}

export class MonkeyNavigator {
  /**
   * 3D spatial positioning taking vertical canopy and branch navigation into account
   */
  public static computeNextPosition(
    x: number,
    y: number,
    z: number,
    baseSpeed: number,
    direction: 1 | -1,
    state: MonkeyBehaviorState,
    bounds: MonkeyNavBounds,
    deltaSec: number
  ): { nextX: number; nextY: number; nextZ: number; nextDirection: 1 | -1 } {
    let speed = baseSpeed;
    let nextX = x;
    let nextY = y;
    let nextZ = z;
    let nextDirection = direction;

    if (state === "curious_approach") {
      nextX += speed * direction * deltaSec * 50;
      nextZ = Math.max(bounds.groundHeightZ + 12, z - (deltaSec * 25));
    } else if (state === "acrobatic_swing") {
      nextX += speed * 1.4 * direction * deltaSec * 50;
      nextZ = bounds.canopyHeightZ - 20 + Math.sin(x * 0.08) * 16;
    } else if (state === "tree_climb" || state === "evasive_leap") {
      nextX -= speed * 1.6 * direction * deltaSec * 50; // Withdraw
      nextZ = Math.min(bounds.canopyHeightZ, z + (deltaSec * 60)); // Climb up
    }

    // Boundary checks
    if (nextX <= bounds.minX) {
      nextX = bounds.minX;
      nextDirection = 1;
    } else if (nextX >= bounds.maxX) {
      nextX = bounds.maxX;
      nextDirection = -1;
    }

    return { nextX, nextY, nextZ, nextDirection };
  }
}
