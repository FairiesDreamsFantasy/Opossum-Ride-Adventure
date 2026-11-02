/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Point2D } from "../../Engine/Mathematics";

/**
 * Mobile touch and swipe gesture capture engine.
 */
export const InputTouch = {
  /**
   * Evaluates the swipe vector between start and end touch coordinates.
   */
  calculateSwipeVector(start: Point2D, end: Point2D): { dx: number; dy: number; distance: number } {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return { dx, dy, distance };
  },

  /**
   * Identifies touch gesture swipe direction.
   */
  getSwipeDirection(start: Point2D, end: Point2D, threshold: number = 30): "UP" | "DOWN" | "LEFT" | "RIGHT" | "NONE" {
    const swipe = this.calculateSwipeVector(start, end);
    if (swipe.distance < threshold) {
      return "NONE";
    }

    if (Math.abs(swipe.dx) > Math.abs(swipe.dy)) {
      return swipe.dx > 0 ? "RIGHT" : "LEFT";
    } else {
      return swipe.dy > 0 ? "DOWN" : "UP";
    }
  }
};
