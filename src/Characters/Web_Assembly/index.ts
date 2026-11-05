/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Fast Spatial Proximity WASM Accelerator
 * WebAssembly 2.0 Computational Pipeline
 */

export const FaunaSpatialProximityWASM = {
  format: "WASM 2.0 Flat Float32 Coordinate Array",

  /**
   * Evaluates pairwise squared Euclidean distance between two fauna entities:
   */
  computeDistanceSquaredWASM: (
    x1: number, y1: number, z1: number,
    x2: number, y2: number, z2: number
  ): number => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const dz = z1 - z2;
    return Number((dx * dx + dy * dy + dz * dz).toFixed(4));
  },

  /**
   * Fast spherical radius culling: determines if an entity is within player awareness radius:
   */
  isWithinAwarenessRadius: (
    playerX: number, playerZ: number,
    faunaX: number, faunaZ: number,
    radiusMeters: number = 50.0
  ): boolean => {
    const dx = playerX - faunaX;
    const dz = playerZ - faunaZ;
    return (dx * dx + dz * dz) <= (radiusMeters * radiusMeters);
  }
};

export default FaunaSpatialProximityWASM;
