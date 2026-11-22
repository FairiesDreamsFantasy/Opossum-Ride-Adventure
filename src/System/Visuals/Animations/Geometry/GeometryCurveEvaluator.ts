/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GeometryCurveEvaluator — Parametric Arcs, Quadratic/Cubic Bezier & Tangent Solvers.
 */

import { GeometryVec2, GeometryVectorMath2D } from "./GeometryVectorMath2D";

export class GeometryCurveEvaluator {
  public static toRadians(deg: number): number {
    return ((Number.isFinite(deg) ? deg : 0) * Math.PI) / 180;
  }

  public static pointOnCircle(radius: number, angleDeg: number, centerX: number, centerY: number): GeometryVec2 {
    const r = Number.isFinite(radius) ? radius : 0;
    const cx = Number.isFinite(centerX) ? centerX : 0;
    const cy = Number.isFinite(centerY) ? centerY : 0;
    const rad = this.toRadians(angleDeg);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  public static evaluateQuadraticBezier2D(
    p0: GeometryVec2,
    p1: GeometryVec2,
    p2: GeometryVec2,
    t: number
  ): GeometryVec2 {
    const u = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
    const inv = 1 - u;
    const a = GeometryVectorMath2D.sanitizeVec2(p0);
    const b = GeometryVectorMath2D.sanitizeVec2(p1);
    const c = GeometryVectorMath2D.sanitizeVec2(p2);
    return {
      x: inv * inv * a.x + 2 * inv * u * b.x + u * u * c.x,
      y: inv * inv * a.y + 2 * inv * u * b.y + u * u * c.y
    };
  }

  public static evaluateCubicBezier2D(
    p0: GeometryVec2,
    p1: GeometryVec2,
    p2: GeometryVec2,
    p3: GeometryVec2,
    t: number
  ): GeometryVec2 {
    const u = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
    const inv = 1 - u;
    const a = GeometryVectorMath2D.sanitizeVec2(p0);
    const b = GeometryVectorMath2D.sanitizeVec2(p1);
    const c = GeometryVectorMath2D.sanitizeVec2(p2);
    const d = GeometryVectorMath2D.sanitizeVec2(p3);
    const inv2 = inv * inv;
    const u2 = u * u;
    return {
      x: inv2 * inv * a.x + 3 * inv2 * u * b.x + 3 * inv * u2 * c.x + u2 * u * d.x,
      y: inv2 * inv * a.y + 3 * inv2 * u * b.y + 3 * inv * u2 * c.y + u2 * u * d.y
    };
  }
}
