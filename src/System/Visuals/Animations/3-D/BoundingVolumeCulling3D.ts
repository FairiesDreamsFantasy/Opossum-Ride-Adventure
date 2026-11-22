/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * BoundingVolumeCulling3D — 3D AABB Overlap & View Frustum Sphere Visibility Culling.
 */

import { SpatialStabilizer3D, Vec3Tuple } from "./SpatialStabilizer3D";

export interface AABB3D {
  min: Vec3Tuple;
  max: Vec3Tuple;
}

export class BoundingVolumeCulling3D {
  public static intersectsAABB(a: AABB3D, b: AABB3D): boolean {
    return (
      a.min.x <= b.max.x && a.max.x >= b.min.x &&
      a.min.y <= b.max.y && a.max.y >= b.min.y &&
      a.min.z <= b.max.z && a.max.z >= b.min.z
    );
  }

  public static isSphereWithinFrustum(
    center: Vec3Tuple,
    radius: number,
    cameraPos: Vec3Tuple,
    nearDist: number,
    farDist: number,
    tanHalfFovX: number = 1.15
  ): boolean {
    const r = Math.max(0.05, SpatialStabilizer3D.sanitizeFinite(radius, 0.5));
    const dz = center.z - cameraPos.z;
    if (dz + r < nearDist || dz - r > farDist) return false;
    const maxLateral = Math.max(1.0, dz) * Math.max(0.2, tanHalfFovX) + r;
    return Math.abs(center.x - cameraPos.x) <= maxLateral;
  }
}
