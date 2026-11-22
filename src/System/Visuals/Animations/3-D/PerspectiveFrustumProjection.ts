/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PerspectiveFrustumProjection — Singularity-Safe Perspective & Camera Viewport Projection.
 */

import { SpatialStabilizer3D } from "./SpatialStabilizer3D";
import { QuaternionKinematics3D } from "./QuaternionKinematics3D";

export interface ProjectedPoint3D {
  x: number;
  y: number;
  scale: number;
  visible: boolean;
}

export class PerspectiveFrustumProjection {
  public static calculatePerspectiveScale(z: number, fov: number = 250): number {
    const safeFov = Math.max(1.0, SpatialStabilizer3D.sanitizeFinite(fov, 250));
    const denom = SpatialStabilizer3D.guardPerspectiveDenominator(z, safeFov);
    return SpatialStabilizer3D.clampFinite(safeFov / denom, 0.0001, 50.0, 1.0);
  }

  public static projectPoint(
    x: number,
    y: number,
    z: number,
    angleX: number,
    angleY: number,
    fov: number = 250,
    angleZ: number = 0
  ): ProjectedPoint3D {
    const q = QuaternionKinematics3D.fromEulerYXZ(angleX, angleY, angleZ);
    const rotated = QuaternionKinematics3D.rotatePoint(q, { x, y, z });
    const safeFov = Math.max(1.0, SpatialStabilizer3D.sanitizeFinite(fov, 250));
    const rawDenom = safeFov + rotated.z;
    const scale = this.calculatePerspectiveScale(rotated.z, safeFov);
    return {
      x: SpatialStabilizer3D.flushDenormal(rotated.x * scale),
      y: SpatialStabilizer3D.flushDenormal(rotated.y * scale),
      scale,
      visible: rawDenom > SpatialStabilizer3D.MIN_NEAR_Z
    };
  }
}
