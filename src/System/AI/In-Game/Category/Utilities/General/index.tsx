/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * AI In-Game Category Utilities General Configuration & Math Kernels
 * Provides 64-bit floating point spatial math, distance calculations,
 * collision bounds checks, and deterministic decision helpers for in-game entities.
 */

export const AIInGameUtilitiesGeneral = {
  version: "1.0.0",
  precision: "64-bit",
  tolerance: 0.000001,
  
  /**
   * Calculates Euclidean distance between 2D or 3D coordinate vectors.
   */
  calculateDistance: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    z1: number = 0,
    z2: number = 0
  ): number => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  /**
   * Clamps a value smoothly within minimum and maximum bounds.
   */
  clamp: (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
  },

  /**
   * Linear interpolation between two numeric targets.
   */
  lerp: (start: number, end: number, t: number): number => {
    return start + (end - start) * Math.max(0, Math.min(1, t));
  },

  /**
   * Evaluates if a point is contained within an axis-aligned bounding box.
   */
  isInAABB: (
    px: number,
    py: number,
    boxX: number,
    boxY: number,
    boxWidth: number,
    boxHeight: number
  ): boolean => {
    return (
      px >= boxX &&
      px <= boxX + boxWidth &&
      py >= boxY &&
      py <= boxY + boxHeight
    );
  }
};
