/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 3-DJS Mathematical Projection & Scene Engine for Visuals
 */

export interface Matrix4x4 {
  elements: Float32Array;
}

export class ThreeDJSMathEngine {
  public static createIdentityMatrix(): Matrix4x4 {
    const el = new Float32Array(16);
    el[0] = 1; el[5] = 1; el[10] = 1; el[15] = 1;
    return { elements: el };
  }

  public static project3DTo2D(
    x: number,
    y: number,
    z: number,
    focalLength: number = 300,
    centerX: number = 400,
    centerY: number = 250
  ): { screenX: number; screenY: number; scale: number; visible: boolean } {
    if (z <= 0.1) {
      return { screenX: centerX, screenY: centerY, scale: 0, visible: false };
    }
    const scale = focalLength / z;
    const screenX = centerX + x * scale;
    const screenY = centerY - y * scale;
    return { screenX, screenY, scale, visible: true };
  }
}

export default ThreeDJSMathEngine;
