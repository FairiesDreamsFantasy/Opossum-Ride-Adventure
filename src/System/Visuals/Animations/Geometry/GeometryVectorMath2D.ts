/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GeometryVectorMath2D — Guarded 2D Vector Operations, Dot/Cross, & Normalization.
 */

export interface GeometryVec2 {
  x: number;
  y: number;
}

export class GeometryVectorMath2D {
  public static sanitizeVec2(v: Partial<GeometryVec2> | null | undefined): GeometryVec2 {
    return {
      x: v && typeof v.x === "number" && Number.isFinite(v.x) ? v.x : 0,
      y: v && typeof v.y === "number" && Number.isFinite(v.y) ? v.y : 0
    };
  }

  public static add(a: GeometryVec2, b: GeometryVec2): GeometryVec2 {
    const va = this.sanitizeVec2(a);
    const vb = this.sanitizeVec2(b);
    return { x: va.x + vb.x, y: va.y + vb.y };
  }

  public static subtract(a: GeometryVec2, b: GeometryVec2): GeometryVec2 {
    const va = this.sanitizeVec2(a);
    const vb = this.sanitizeVec2(b);
    return { x: va.x - vb.x, y: va.y - vb.y };
  }

  public static dot(a: GeometryVec2, b: GeometryVec2): number {
    const va = this.sanitizeVec2(a);
    const vb = this.sanitizeVec2(b);
    return va.x * vb.x + va.y * vb.y;
  }

  public static cross2D(a: GeometryVec2, b: GeometryVec2): number {
    const va = this.sanitizeVec2(a);
    const vb = this.sanitizeVec2(b);
    return va.x * vb.y - va.y * vb.x;
  }

  public static magnitude(v: GeometryVec2): number {
    const sv = this.sanitizeVec2(v);
    return Math.hypot(sv.x, sv.y);
  }

  public static distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = (Number.isFinite(x2) ? x2 : 0) - (Number.isFinite(x1) ? x1 : 0);
    const dy = (Number.isFinite(y2) ? y2 : 0) - (Number.isFinite(y1) ? y1 : 0);
    return Math.hypot(dx, dy);
  }

  public static normalize(v: GeometryVec2): GeometryVec2 {
    const sv = this.sanitizeVec2(v);
    const len = Math.hypot(sv.x, sv.y);
    if (len < 1e-12) return { x: 0, y: 0 };
    return { x: sv.x / len, y: sv.y / len };
  }
}
