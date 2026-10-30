/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Volumetric_Viewport General: 4D Coordinate Matrices
 */

export interface LightFieldVector {
  x: number;
  y: number;
  z: number;
  w: number; // Volumetric intensity/opacity
}

export class VolumetricViewportMath {
  /**
   * Projects a standard 3D point into a 4D light-field vector 
   * for holographic display mapping.
   */
  public static projectToLightField(x: number, y: number, z: number, intensity: number): LightFieldVector {
    return { x, y, z, w: intensity };
  }

  /**
   * Calculates the voxel-grid density for a given viewport volume.
   */
  public static calculateVoxelDensity(width: number, height: number, depth: number): number {
    return width * height * depth;
  }
}

export default VolumetricViewportMath;
