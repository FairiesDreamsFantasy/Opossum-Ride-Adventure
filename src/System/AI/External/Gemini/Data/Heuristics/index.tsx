/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Point2D } from "../../Engine/Mathematics";

/**
 * Spatial pathfinding distance heuristics.
 */
export const DataHeuristics = {
  /**
   * Manhattan distance (perfect for grid coordinate systems).
   */
  getManhattanDistance(p1: Point2D, p2: Point2D): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  },

  /**
   * Diagonal distance heuristic.
   */
  getDiagonalDistance(p1: Point2D, p2: Point2D): number {
    const dx = Math.abs(p1.x - p2.x);
    const dy = Math.abs(p1.y - p2.y);
    return Math.max(dx, dy);
  }
};
