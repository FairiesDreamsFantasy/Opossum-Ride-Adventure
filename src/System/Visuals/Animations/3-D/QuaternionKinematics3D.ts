/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * QuaternionKinematics3D — Gimbal-Lock-Free 3-Axis Rotation & SLERP Kernel.
 */

import { SpatialStabilizer3D, Vec3Tuple } from "./SpatialStabilizer3D";

export interface Quaternion3D {
  w: number;
  x: number;
  y: number;
  z: number;
}

export class QuaternionKinematics3D {
  public static identity(): Quaternion3D {
    return { w: 1, x: 0, y: 0, z: 0 };
  }

  public static normalize(q: Quaternion3D): Quaternion3D {
    const w = SpatialStabilizer3D.sanitizeFinite(q.w, 1);
    const x = SpatialStabilizer3D.sanitizeFinite(q.x, 0);
    const y = SpatialStabilizer3D.sanitizeFinite(q.y, 0);
    const z = SpatialStabilizer3D.sanitizeFinite(q.z, 0);
    const len = Math.hypot(w, x, y, z);
    if (len < 1e-12) return this.identity();
    const inv = 1.0 / len;
    return {
      w: SpatialStabilizer3D.flushDenormal(w * inv),
      x: SpatialStabilizer3D.flushDenormal(x * inv),
      y: SpatialStabilizer3D.flushDenormal(y * inv),
      z: SpatialStabilizer3D.flushDenormal(z * inv)
    };
  }

  public static fromEulerYXZ(pitchX: number, yawY: number, rollZ: number = 0): Quaternion3D {
    const hx = SpatialStabilizer3D.sanitizeFinite(pitchX, 0) * 0.5;
    const hy = SpatialStabilizer3D.sanitizeFinite(yawY, 0) * 0.5;
    const hz = SpatialStabilizer3D.sanitizeFinite(rollZ, 0) * 0.5;
    const cx = Math.cos(hx), sx = Math.sin(hx);
    const cy = Math.cos(hy), sy = Math.sin(hy);
    const cz = Math.cos(hz), sz = Math.sin(hz);
    return this.normalize({
      w: cy * cx * cz + sy * sx * sz,
      x: cy * sx * cz + sy * cx * sz,
      y: sy * cx * cz - cy * sx * sz,
      z: cy * cx * sz - sy * sx * cz
    });
  }

  public static rotatePoint(q: Quaternion3D, p: Vec3Tuple): Vec3Tuple {
    const nq = this.normalize(q);
    const clean = SpatialStabilizer3D.sanitizeVec3(p);
    const ux = nq.x, uy = nq.y, uz = nq.z, s = nq.w;
    const uvx = uy * clean.z - uz * clean.y;
    const uvy = uz * clean.x - ux * clean.z;
    const uvz = ux * clean.y - uy * clean.x;
    const uuvx = uy * uvz - uz * uvy;
    const uuvy = uz * uvx - ux * uvz;
    const uuvz = ux * uvy - uy * uvx;
    return {
      x: SpatialStabilizer3D.flushDenormal(clean.x + 2.0 * (s * uvx + uuvx)),
      y: SpatialStabilizer3D.flushDenormal(clean.y + 2.0 * (s * uvy + uuvy)),
      z: SpatialStabilizer3D.flushDenormal(clean.z + 2.0 * (s * uvz + uuvz))
    };
  }

  public static slerp(a: Quaternion3D, b: Quaternion3D, t: number): Quaternion3D {
    const qa = this.normalize(a);
    let qb = this.normalize(b);
    const ct = SpatialStabilizer3D.clampFinite(t, 0, 1, 0);
    let dot = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;
    if (dot < 0) {
      qb = { w: -qb.w, x: -qb.x, y: -qb.y, z: -qb.z };
      dot = -dot;
    }
    if (dot > 0.9995) {
      return this.normalize({
        w: qa.w + ct * (qb.w - qa.w),
        x: qa.x + ct * (qb.x - qa.x),
        y: qa.y + ct * (qb.y - qa.y),
        z: qa.z + ct * (qb.z - qa.z)
      });
    }
    const theta0 = Math.acos(SpatialStabilizer3D.clampFinite(dot, -1, 1, 1));
    const sinTheta0 = Math.sin(theta0);
    const theta = theta0 * ct;
    const s0 = Math.sin(theta0 - theta) / sinTheta0;
    const s1 = Math.sin(theta) / sinTheta0;
    return this.normalize({
      w: qa.w * s0 + qb.w * s1,
      x: qa.x * s0 + qb.x * s1,
      y: qa.y * s0 + qb.y * s1,
      z: qa.z * s0 + qb.z * s1
    });
  }
}
