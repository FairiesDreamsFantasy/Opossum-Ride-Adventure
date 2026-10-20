/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vector3D, Matrix4x4 } from "../../../Engine/Mathematics";

/**
 * 3D matrix transformations and wireframe animation system.
 */
export const Animations3D = {
  /**
   * Applies matrix transformations to a 3D vertex representing 3D Opossum geometry meshes.
   */
  transformVertex(vertex: Vector3D, matrix: Matrix4x4): Vector3D {
    const w = vertex.x * matrix[0][3] + vertex.y * matrix[1][3] + vertex.z * matrix[2][3] + matrix[3][3] || 1;
    return {
      x: (vertex.x * matrix[0][0] + vertex.y * matrix[1][0] + vertex.z * matrix[2][0] + matrix[3][0]) / w,
      y: (vertex.x * matrix[0][1] + vertex.y * matrix[1][1] + vertex.z * matrix[2][1] + matrix[3][1]) / w,
      z: (vertex.x * matrix[0][2] + vertex.y * matrix[1][2] + vertex.z * matrix[2][2] + matrix[3][2]) / w
    };
  },

  /**
   * Generates a rotation matrix around all three axes (yaw, pitch, roll).
   */
  createEulerRotationMatrix(yaw: number, pitch: number, roll: number): Matrix4x4 {
    const cY = Math.cos(yaw);
    const sY = Math.sin(yaw);
    const cP = Math.cos(pitch);
    const sP = Math.sin(pitch);
    const cR = Math.cos(roll);
    const sR = Math.sin(roll);

    return [
      [cY * cR + sY * sP * sR, -cY * sR + sY * sP * cR, sY * cP, 0],
      [cP * sR, cP * cR, -sP, 0],
      [-sY * cR + cY * sP * sR, sY * sR + cY * sP * cR, cY * cP, 0],
      [0, 0, 0, 1]
    ];
  }
};
