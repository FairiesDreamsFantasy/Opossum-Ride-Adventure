/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PolygonTessellationKernel — Shoelace Area, Winding Order, & Centroid Solver.
 */

export interface PolygonVertex2D {
  x: number;
  y: number;
}

export class PolygonTessellationKernel {
  public static computeSignedArea(points: readonly PolygonVertex2D[]): number {
    if (!points || points.length < 3) return 0;
    let sum = 0;
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      const b = points[(i + 1) % points.length];
      if (!a || !b || !Number.isFinite(a.x) || !Number.isFinite(a.y) || !Number.isFinite(b.x) || !Number.isFinite(b.y)) {
        continue;
      }
      sum += a.x * b.y - b.x * a.y;
    }
    return 0.5 * sum;
  }

  public static ensureCounterClockwise(points: readonly PolygonVertex2D[]): PolygonVertex2D[] {
    if (!points || points.length < 3) return [...(points || [])];
    return this.computeSignedArea(points) < 0 ? [...points].reverse() : [...points];
  }

  public static computeCentroid(points: readonly PolygonVertex2D[]): PolygonVertex2D {
    if (!points || points.length === 0) return { x: 0, y: 0 };
    let sx = 0, sy = 0, count = 0;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
        sx += p.x;
        sy += p.y;
        count++;
      }
    }
    return count > 0 ? { x: sx / count, y: sy / count } : { x: 0, y: 0 };
  }
}
