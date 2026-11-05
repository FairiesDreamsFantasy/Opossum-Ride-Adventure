/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Master Arena Acoustics & Spatial Boundary Kernel
 * Native C++ High-Precision Simulation Bridge
 */

export interface IArenaAcousticProfile {
  volumeCubicMeters: number;
  totalSurfaceAreaSqMeters: number;
  averageAbsorptionCoefficient: number; // alpha (0.01 = highly reflective stone, 0.40 = absorbent foliage/soil)
}

export const ArenaAcousticsKernelCPP = {
  standard: "Sabine-Eyring Reverberation Metric (RT60)",

  /**
   * Computes the Sabine reverberation time RT60 (seconds required for sound energy to drop 60dB):
   * RT60 = 0.161 * (V / A)
   * where V is room volume (m^3), A = S * alpha is total absorption units (sabins).
   */
  computeSabineRT60: (profile: IArenaAcousticProfile): number => {
    const v = Math.max(10.0, profile.volumeCubicMeters);
    const s = Math.max(10.0, profile.totalSurfaceAreaSqMeters);
    const alpha = Math.min(0.99, Math.max(0.01, profile.averageAbsorptionCoefficient));
    const totalAbsorption = s * alpha;
    const rt60 = (0.161 * v) / totalAbsorption;
    return Number(Math.max(0.05, Math.min(8.0, rt60)).toFixed(4));
  },

  /**
   * Evaluates 2D spatial grid cell index for O(1) boundary query hashing:
   */
  computeSpatialCellHash: (x: number, z: number, cellSize: number = 64.0): string => {
    const gridX = Math.floor(x / cellSize);
    const gridZ = Math.floor(z / cellSize);
    return `cell_${gridX}_${gridZ}`;
  },

  /**
   * Evaluates terrain friction factor against mount speed:
   */
  evaluateFrictionDeceleration: (surfaceType: string, currentSpeed: number): number => {
    const frictionMap: Record<string, number> = {
      ice: 0.02,
      sand: 0.35,
      grass: 0.15,
      gravel: 0.22,
      stone: 0.10,
      wood: 0.12,
      crystal_slate: 0.08,
      basalt: 0.11
    };
    const coeff = frictionMap[surfaceType.toLowerCase()] ?? 0.14;
    return Number((currentSpeed * coeff * 0.016667).toFixed(6));
  }
};

export default ArenaAcousticsKernelCPP;
