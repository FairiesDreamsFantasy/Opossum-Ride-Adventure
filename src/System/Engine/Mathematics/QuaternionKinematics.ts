/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * QuaternionKinematics — Gimbal-Lock-Free 3D Orientation Algebra & SLERP.
 */

import { MathStabilizer } from "./NumericalStabilizer";

export interface QuaternionTuple {
  w: number;
  x: number;
  y: number;
  z: number;
}

export interface EulerAnglesRad {
  x: number;
  y: number;
  z: number;
}

export class QuaternionKinematicsSolver {
  public static identity(): QuaternionTuple {
    return { w: 1, x: 0, y: 0, z: 0 };
  }

  public static normalize(q: QuaternionTuple): QuaternionTuple {
    const w = MathStabilizer.sanitizeFinite(q.w, 1);
    const x = MathStabilizer.sanitizeFinite(q.x, 0);
    const y = MathStabilizer.sanitizeFinite(q.y, 0);
    const z = MathStabilizer.sanitizeFinite(q.z, 0);
    const mag = Math.hypot(w, x, y, z);
    if (mag < MathStabilizer.EPSILON) {
      return this.identity();
    }
    const inv = 1.0 / mag;
    return {
      w: MathStabilizer.flushDenormal(w * inv),
      x: MathStabilizer.flushDenormal(x * inv),
      y: MathStabilizer.flushDenormal(y * inv),
      z: MathStabilizer.flushDenormal(z * inv)
    };
  }

  public static multiply(a: QuaternionTuple, b: QuaternionTuple): QuaternionTuple {
    return this.normalize({
      w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
      x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
      y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
      z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w
    });
  }

  public static fromAxisAngle(axisX: number, axisY: number, axisZ: number, angleRad: number): QuaternionTuple {
    const len = Math.hypot(
      MathStabilizer.sanitizeFinite(axisX, 0),
      MathStabilizer.sanitizeFinite(axisY, 1),
      MathStabilizer.sanitizeFinite(axisZ, 0)
    );
    if (len < MathStabilizer.EPSILON) {
      return this.identity();
    }
    const halfAngle = MathStabilizer.sanitizeFinite(angleRad, 0) * 0.5;
    const s = Math.sin(halfAngle) / len;
    return this.normalize({
      w: Math.cos(halfAngle),
      x: axisX * s,
      y: axisY * s,
      z: axisZ * s
    });
  }

  public static fromEulerXYZ(pitchX: number, yawY: number, rollZ: number): QuaternionTuple {
    const hx = MathStabilizer.sanitizeFinite(pitchX, 0) * 0.5;
    const hy = MathStabilizer.sanitizeFinite(yawY, 0) * 0.5;
    const hz = MathStabilizer.sanitizeFinite(rollZ, 0) * 0.5;
    const cx = Math.cos(hx), sx = Math.sin(hx);
    const cy = Math.cos(hy), sy = Math.sin(hy);
    const cz = Math.cos(hz), sz = Math.sin(hz);
    return this.normalize({
      w: cx * cy * cz - sx * sy * sz,
      x: sx * cy * cz + cx * sy * sz,
      y: cx * sy * cz - sx * cy * sz,
      z: cx * cy * sz + sx * sy * cz
    });
  }

  public static slerp(a: QuaternionTuple, b: QuaternionTuple, t: number): QuaternionTuple {
    const qa = this.normalize(a);
    let qb = this.normalize(b);
    const clampedT = MathStabilizer.clampFinite(t, 0, 1, 0);

    let dot = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;
    if (dot < 0) {
      qb = { w: -qb.w, x: -qb.x, y: -qb.y, z: -qb.z };
      dot = -dot;
    }
    if (dot > 0.9995) {
      return this.normalize({
        w: qa.w + clampedT * (qb.w - qa.w),
        x: qa.x + clampedT * (qb.x - qa.x),
        y: qa.y + clampedT * (qb.y - qa.y),
        z: qa.z + clampedT * (qb.z - qa.z)
      });
    }

    const theta0 = Math.acos(MathStabilizer.clampFinite(dot, -1, 1, 1));
    const sinTheta0 = Math.sin(theta0);
    const theta = theta0 * clampedT;
    const s0 = Math.sin(theta0 - theta) / sinTheta0;
    const s1 = Math.sin(theta) / sinTheta0;

    return this.normalize({
      w: qa.w * s0 + qb.w * s1,
      x: qa.x * s0 + qb.x * s1,
      y: qa.y * s0 + qb.y * s1,
      z: qa.z * s0 + qb.z * s1
    });
  }

  public static rotateVector3(
    q: QuaternionTuple,
    vx: number,
    vy: number,
    vz: number
  ): { x: number; y: number; z: number } {
    const nq = this.normalize(q);
    const ux = nq.x, uy = nq.y, uz = nq.z, s = nq.w;
    const px = MathStabilizer.sanitizeFinite(vx, 0);
    const py = MathStabilizer.sanitizeFinite(vy, 0);
    const pz = MathStabilizer.sanitizeFinite(vz, 0);

    const uvx = uy * pz - uz * py;
    const uvy = uz * px - ux * pz;
    const uvz = ux * py - uy * px;

    const uuvx = uy * uvz - uz * uvy;
    const uuvy = uz * uvx - ux * uvz;
    const uuvz = ux * uvy - uy * uvx;

    return {
      x: MathStabilizer.flushDenormal(px + 2.0 * (s * uvx + uuvx)),
      y: MathStabilizer.flushDenormal(py + 2.0 * (s * uvy + uuvy)),
      z: MathStabilizer.flushDenormal(pz + 2.0 * (s * uvz + uuvz))
    };
  }
}
