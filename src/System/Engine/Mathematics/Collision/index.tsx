/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Axis-Aligned Bounding Box (AABB) collision arbitration engine.
 */
export const CollisionEngine = {
  /**
   * Performs AABB intersection test for two boxes defined by min and max corners.
   */
  intersectAABB(
    min1: { x: number; y: number; z: number },
    max1: { x: number; y: number; z: number },
    min2: { x: number; y: number; z: number },
    max2: { x: number; y: number; z: number }
  ): boolean {
    return (
      min1.x <= max2.x && max1.x >= min2.x &&
      min1.y <= max2.y && max1.y >= min2.y &&
      min1.z <= max2.z && max1.z >= min2.z
    );
  }
};
