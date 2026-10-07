/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScreenProjection } from "../../Engine/Graphical_Renderer";

/**
 * High-performance visuals rendering mathematics engine for Gemini.
 */
export const VisualsEngine = {
  /**
   * Projects 3D world space coordinate into 2D camera viewport plane.
   */
  project3DSpace(
    x: number,
    y: number,
    z: number,
    cameraX: number,
    cameraY: number,
    cameraZ: number,
    fov: number,
    width: number,
    height: number
  ): ScreenProjection {
    const rZ = z - cameraZ;
    if (rZ <= 0.05) {
      return { x: 0, y: 0, scale: 0, visible: false };
    }
    const scale = fov / rZ;
    const pX = width / 2 + (x - cameraX) * scale;
    const pY = height / 2 - (y - cameraY) * scale;

    const visible = pX >= -100 && pX <= width + 100 && pY >= -100 && pY <= height + 100;
    return { x: pX, y: pY, scale, visible };
  },

  /**
   * Calculates depth buffering factor for painter's sorting algorithm.
   */
  getDepthWeight(z: number, cameraZ: number): number {
    return Math.max(0.0001, z - cameraZ);
  }
};
