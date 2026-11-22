/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SurfaceNormalLighting3D — Cross-Product Normals, Back-Face Culling, & Lambertian Shading.
 */

import { SpatialStabilizer3D, Vec3Tuple } from "./SpatialStabilizer3D";

export class SurfaceNormalLighting3D {
  public static computeTriangleNormal(a: Vec3Tuple, b: Vec3Tuple, c: Vec3Tuple): Vec3Tuple {
    const ux = b.x - a.x, uy = b.y - a.y, uz = b.z - a.z;
    const vx = c.x - a.x, vy = c.y - a.y, vz = c.z - a.z;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz);
    if (len < 1e-12) return { x: 0, y: 1, z: 0 };
    const inv = 1.0 / len;
    return {
      x: SpatialStabilizer3D.flushDenormal(nx * inv),
      y: SpatialStabilizer3D.flushDenormal(ny * inv),
      z: SpatialStabilizer3D.flushDenormal(nz * inv)
    };
  }

  public static isFrontFacing(normal: Vec3Tuple, viewDirToCamera: Vec3Tuple = { x: 0, y: 0, z: -1 }): boolean {
    const dot = normal.x * viewDirToCamera.x + normal.y * viewDirToCamera.y + normal.z * viewDirToCamera.z;
    return Number.isFinite(dot) && dot >= -1e-4;
  }

  public static computeLambertDiffuse(
    normal: Vec3Tuple,
    lightDir: Vec3Tuple,
    ambientFloor: number = 0.2
  ): number {
    const lLen = Math.hypot(lightDir.x, lightDir.y, lightDir.z);
    if (lLen < 1e-12) return SpatialStabilizer3D.clampFinite(ambientFloor, 0, 1, 0.2);
    const dot = (normal.x * lightDir.x + normal.y * lightDir.y + normal.z * lightDir.z) / lLen;
    const diffuse = Math.max(0, SpatialStabilizer3D.sanitizeFinite(dot, 0));
    return SpatialStabilizer3D.clampFinite(ambientFloor + (1.0 - ambientFloor) * diffuse, 0, 1, ambientFloor);
  }
}
