/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Point2D } from "../../../Engine/Mathematics";

/**
 * High-performance geometric overlap and vector math.
 */
export const AnimationsGeometry = {
  /**
   * Evaluates if a point lies within a bounding circle.
   */
  isPointInCircle(point: Point2D, circleCenter: Point2D, radius: number): boolean {
    const dx = point.x - circleCenter.x;
    const dy = point.y - circleCenter.y;
    return dx * dx + dy * dy <= radius * radius;
  },

  /**
   * Determines if two bounding spheres overlap in 2D space.
   */
  spheresOverlap(c1: Point2D, r1: number, c2: Point2D, r2: number): boolean {
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const distSq = dx * dx + dy * dy;
    const rSum = r1 + r2;
    return distSq <= rSum * rSum;
  }
};
