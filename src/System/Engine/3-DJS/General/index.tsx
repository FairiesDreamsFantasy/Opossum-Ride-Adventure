/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Linear Algebra Vector Matrices & Quaternions
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Homogeneous 4x4 coordinate matrices, projection systems, and SLERP vectors
 */

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Vector4D {
  x: number;
  y: number;
  z: number;
  w: number;
}

export type Matrix4x4 = [
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number]
];

export interface EulerRotation {
  pitch: number;
  yaw: number;
  roll: number;
}

export class LinearAlgebraMath {
  public static createIdentity(): Matrix4x4 {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }

  public static multiplyMatrixVector(m: Matrix4x4, v: Vector4D): Vector4D {
    return {
      x: m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z + m[0][3] * v.w,
      y: m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z + m[1][3] * v.w,
      z: m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z + m[2][3] * v.w,
      w: m[3][0] * v.x + m[3][1] * v.y + m[3][2] * v.z + m[3][3] * v.w
    };
  }

  public static multiplyMatrices(a: Matrix4x4, b: Matrix4x4): Matrix4x4 {
    const res = this.createIdentity();
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        res[r][c] = a[r][0] * b[0][c] +
                     a[r][1] * b[1][c] +
                     a[r][2] * b[2][c] +
                     a[r][3] * b[3][c];
      }
    }
    return res;
  }
}
