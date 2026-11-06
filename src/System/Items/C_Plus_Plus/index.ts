/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Item & Obstacle 3D AABB Collision Tree
 * Native C++ High-Precision Items Bridge
 */

export interface IAabb3D {
  minX: number; maxX: number;
  minY: number; maxY: number;
  minZ: number; maxZ: number;
}

export const ItemsCollisionTreeCPP = {
  /**
   * Evaluates 3D Axis-Aligned Bounding Box (AABB) intersection:
   */
  checkAabbIntersection: (a: IAabb3D, b: IAabb3D): boolean => {
    return (
      a.minX <= b.maxX && a.maxX >= b.minX &&
      a.minY <= b.maxY && a.maxY >= b.minY &&
      a.minZ <= b.maxZ && a.maxZ >= b.minZ
    );
  }
};

export default ItemsCollisionTreeCPP;
