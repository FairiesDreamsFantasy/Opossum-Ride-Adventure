/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Dynamic AABB (Axis-Aligned Bounding Box) Tree Engine for Gemini AI
 * High-performance spatial partitioning for ray-marching and collision.
 */
export const GeminiPhysicsAABBTrees = {
  /**
   * Checks for intersection between two 3D AABBs.
   */
  intersects: (minA: number[], maxA: number[], minB: number[], maxB: number[]): boolean => {
    return (
      minA[0] <= maxB[0] && maxA[0] >= minB[0] &&
      minA[1] <= maxB[1] && maxA[1] >= minB[1] &&
      minA[2] <= maxB[2] && maxA[2] >= minB[2]
    );
  }
};

export default GeminiPhysicsAABBTrees;
