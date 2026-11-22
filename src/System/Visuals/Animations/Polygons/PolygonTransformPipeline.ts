/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PolygonTransformPipeline — Centroid Rotation/Scaling & Safe SVG Path Serialization.
 */

import { PolygonTessellationKernel, PolygonVertex2D } from "./PolygonTessellationKernel";

export class PolygonTransformPipeline {
  public static rotateAndScale(
    points: readonly PolygonVertex2D[],
    angleRad: number,
    scale: number = 1.0,
    origin?: PolygonVertex2D
  ): PolygonVertex2D[] {
    if (!points || !points.length) return [];
    const pivot = origin ?? PolygonTessellationKernel.computeCentroid(points);
    const a = Number.isFinite(angleRad) ? angleRad : 0;
    const s = Number.isFinite(scale) ? scale : 1.0;
    const cosA = Math.cos(a), sinA = Math.sin(a);

    return points.map((p) => {
      const dx = (Number.isFinite(p.x) ? p.x : 0) - pivot.x;
      const dy = (Number.isFinite(p.y) ? p.y : 0) - pivot.y;
      return {
        x: pivot.x + (dx * cosA - dy * sinA) * s,
        y: pivot.y + (dx * sinA + dy * cosA) * s
      };
    });
  }

  public static toSvgPath(points: readonly PolygonVertex2D[]): string {
    if (!points || points.length === 0) return "";
    const parts: string[] = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
      parts.push(`${parts.length === 0 ? "M" : "L"} ${p.x.toFixed(3)} ${p.y.toFixed(3)}`);
    }
    return parts.length ? `${parts.join(" ")} Z` : "";
  }
}
