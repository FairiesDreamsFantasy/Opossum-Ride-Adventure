/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 4x4 Matrix transformations for 3D projections and spatial orientation.
 */
export class Matrix4x4Engine {
  private data: number[]; // Flat 16-element array (row-major)

  constructor(data?: number[]) {
    this.data = data || new Array(16).fill(0).map((_, i) => (i % 5 === 0 ? 1 : 0)); // Identity
  }

  public static multiply(a: Matrix4x4Engine, b: Matrix4x4Engine): Matrix4x4Engine {
    const result = new Array(16).fill(0);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        for (let k = 0; k < 4; k++) {
          result[row * 4 + col] += a.data[row * 4 + k] * b.data[k * 4 + col];
        }
      }
    }
    return new Matrix4x4Engine(result);
  }

  public static createRotation(angleRad: number, axis: "x" | "y" | "z"): Matrix4x4Engine {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const mat = new Matrix4x4Engine();
    if (axis === "x") {
        mat.data[5] = cos; mat.data[6] = -sin;
        mat.data[9] = sin; mat.data[10] = cos;
    } else if (axis === "y") {
        mat.data[0] = cos; mat.data[2] = sin;
        mat.data[8] = -sin; mat.data[10] = cos;
    } else {
        mat.data[0] = cos; mat.data[1] = -sin;
        mat.data[4] = sin; mat.data[5] = cos;
    }
    return mat;
  }
}
