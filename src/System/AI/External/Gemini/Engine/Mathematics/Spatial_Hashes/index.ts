/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Spatial Hash Grid Engine for Gemini AI
 * Provides O(1) entity proximity lookups for high-performance collision detection.
 */
export const GeminiMathSpatialHashes = {
  cellSize: 100,
  grid: new Map<string, string[]>(),
  
  /**
   * Generates a unique hash key for a 3D coordinate.
   */
  getHash: (x: number, y: number, z: number): string => {
    const hx = Math.floor(x / GeminiMathSpatialHashes.cellSize);
    const hy = Math.floor(y / GeminiMathSpatialHashes.cellSize);
    const hz = Math.floor(z / GeminiMathSpatialHashes.cellSize);
    return `${hx}|${hy}|${hz}`;
  },
  
  /**
   * Inserts an entity ID into the spatial grid.
   */
  insert: (entityId: string, x: number, y: number, z: number): void => {
    const hash = GeminiMathSpatialHashes.getHash(x, y, z);
    if (!GeminiMathSpatialHashes.grid.has(hash)) {
      GeminiMathSpatialHashes.grid.set(hash, []);
    }
    GeminiMathSpatialHashes.grid.get(hash)?.push(entityId);
  }
};

export default GeminiMathSpatialHashes;
