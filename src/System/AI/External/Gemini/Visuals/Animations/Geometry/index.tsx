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
  },

  /**
   * Cubic Hermite Spline interpolation for smooth animation keyframes.
   * p0: start point, p1: end point, m0: start tangent, m1: end tangent, t: time (0 to 1)
   */
  cubicHermiteSpline(p0: number, p1: number, m0: number, m1: number, t: number): number {
    const t2 = t * t;
    const t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * p0 + (t3 - 2 * t2 + t) * m0 + (-2 * t3 + 3 * t2) * p1 + (t3 - t2) * m1;
  }
};
