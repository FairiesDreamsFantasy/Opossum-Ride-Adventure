/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PolygonDeformationSolver — Harmonic Radial Morphing & Inset/Bevel Vertices.
 */

import { PolygonTessellationKernel, PolygonVertex2D } from "./PolygonTessellationKernel";

export class PolygonDeformationSolver {
  public static applyHarmonicPulse(
    points: readonly PolygonVertex2D[],
    timeSec: number,
    amplitude: number = 0.08,
    frequencyHz: number = 2.0
  ): PolygonVertex2D[] {
    if (!points || !points.length) return [];
    const centroid = PolygonTessellationKernel.computeCentroid(points);
    const t = Number.isFinite(timeSec) ? timeSec : 0;
    const amp = Math.max(0, Math.min(0.6, Number.isFinite(amplitude) ? amplitude : 0.08));
    const freq = Math.max(0.1, Number.isFinite(frequencyHz) ? frequencyHz : 2.0);

    return points.map((p, idx) => {
      const phase = 2 * Math.PI * freq * t + idx * 0.7;
      const radialScale = 1.0 + amp * Math.sin(phase);
      return {
        x: centroid.x + (p.x - centroid.x) * radialScale,
        y: centroid.y + (p.y - centroid.y) * radialScale
      };
    });
  }
}
