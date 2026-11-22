/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * MatrixTransformSolver — Zero-GC Packed Float64Array 4x4 Homogeneous Matrix Algebra.
 */

import { MathStabilizer } from "./NumericalStabilizer";

export class Matrix4x4Float64 {
  public static identity(): Float64Array {
    const m = new Float64Array(16);
    m[0] = 1; m[5] = 1; m[10] = 1; m[15] = 1;
    return m;
  }

  public static translation(tx: number, ty: number, tz: number): Float64Array {
    const m = this.identity();
    m[12] = MathStabilizer.sanitizeFinite(tx, 0);
    m[13] = MathStabilizer.sanitizeFinite(ty, 0);
    m[14] = MathStabilizer.sanitizeFinite(tz, 0);
    return m;
  }

  public static scaling(sx: number, sy: number, sz: number): Float64Array {
    const m = new Float64Array(16);
    m[0] = MathStabilizer.sanitizeFinite(sx, 1);
    m[5] = MathStabilizer.sanitizeFinite(sy, 1);
    m[10] = MathStabilizer.sanitizeFinite(sz, 1);
    m[15] = 1;
    return m;
  }

  public static multiply(a: Float64Array, b: Float64Array, out?: Float64Array): Float64Array {
    const target = out && out.length >= 16 ? out : new Float64Array(16);
    for (let col = 0; col < 4; col++) {
      const colOffset = col * 4;
      for (let row = 0; row < 4; row++) {
        target[colOffset + row] = MathStabilizer.flushDenormal(
          a[row] * b[colOffset] +
          a[4 + row] * b[colOffset + 1] +
          a[8 + row] * b[colOffset + 2] +
          a[12 + row] * b[colOffset + 3]
        );
      }
    }
    return target;
  }

  public static perspective(fovRad: number, aspect: number, near: number, far: number): Float64Array {
    const safeFov = MathStabilizer.clampFinite(fovRad, 0.08, Math.PI - 0.08, Math.PI / 3);
    const safeAspect = Math.max(0.05, MathStabilizer.sanitizeFinite(aspect, 16 / 9));
    const safeNear = Math.max(0.01, MathStabilizer.sanitizeFinite(near, 0.1));
    const safeFar = Math.max(safeNear + 1.0, MathStabilizer.sanitizeFinite(far, 5000));

    const f = 1.0 / Math.tan(safeFov * 0.5);
    const nf = 1.0 / (safeNear - safeFar);
    const m = new Float64Array(16);
    m[0] = f / safeAspect;
    m[5] = f;
    m[10] = (safeFar + safeNear) * nf;
    m[11] = -1.0;
    m[14] = (2.0 * safeFar * safeNear) * nf;
    return m;
  }

  public static transformPoint(
    m: Float64Array,
    x: number,
    y: number,
    z: number
  ): { x: number; y: number; z: number; w: number } {
    const px = MathStabilizer.sanitizeFinite(x, 0);
    const py = MathStabilizer.sanitizeFinite(y, 0);
    const pz = MathStabilizer.sanitizeFinite(z, 0);
    const w = MathStabilizer.sanitizeFinite(m[3] * px + m[7] * py + m[11] * pz + m[15], 1);
    const invW = Math.abs(w) > MathStabilizer.EPSILON ? 1.0 / w : 1.0;
    return {
      x: MathStabilizer.flushDenormal((m[0] * px + m[4] * py + m[8] * pz + m[12]) * invW),
      y: MathStabilizer.flushDenormal((m[1] * px + m[5] * py + m[9] * pz + m[13]) * invW),
      z: MathStabilizer.flushDenormal((m[2] * px + m[6] * py + m[10] * pz + m[14]) * invW),
      w
    };
  }
}
