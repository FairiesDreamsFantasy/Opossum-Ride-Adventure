/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * InterpolationSplines — Bezier, Catmull-Rom, Hermite, and C2-Smooth Curves.
 */

import { MathStabilizer } from "./NumericalStabilizer";

export class SplineInterpolationSolver {
  public static inverseLerp(a: number, b: number, value: number): number {
    const safeA = MathStabilizer.sanitizeFinite(a, 0);
    const safeB = MathStabilizer.sanitizeFinite(b, 1);
    const span = safeB - safeA;
    if (Math.abs(span) < MathStabilizer.EPSILON) return 0;
    return MathStabilizer.clampFinite((MathStabilizer.sanitizeFinite(value, safeA) - safeA) / span, 0, 1, 0);
  }

  public static smoothstep(edge0: number, edge1: number, x: number): number {
    const t = this.inverseLerp(edge0, edge1, x);
    return t * t * (3.0 - 2.0 * t);
  }

  public static smootherstep(edge0: number, edge1: number, x: number): number {
    const t = this.inverseLerp(edge0, edge1, x);
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }

  public static cubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const ct = MathStabilizer.clampFinite(t, 0, 1, 0);
    const u = 1.0 - ct;
    return MathStabilizer.flushDenormal(
      u * u * u * MathStabilizer.sanitizeFinite(p0, 0) +
      3.0 * u * u * ct * MathStabilizer.sanitizeFinite(p1, 0) +
      3.0 * u * ct * ct * MathStabilizer.sanitizeFinite(p2, 0) +
      ct * ct * ct * MathStabilizer.sanitizeFinite(p3, 0)
    );
  }

  public static catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const ct = MathStabilizer.clampFinite(t, 0, 1, 0);
    const t2 = ct * ct;
    const t3 = t2 * ct;
    const a = MathStabilizer.sanitizeFinite(p0, 0);
    const b = MathStabilizer.sanitizeFinite(p1, 0);
    const c = MathStabilizer.sanitizeFinite(p2, 0);
    const d = MathStabilizer.sanitizeFinite(p3, 0);
    return MathStabilizer.flushDenormal(
      0.5 * (
        (2.0 * b) +
        (-a + c) * ct +
        (2.0 * a - 5.0 * b + 4.0 * c - d) * t2 +
        (-a + 3.0 * b - 3.0 * c + d) * t3
      )
    );
  }
}
