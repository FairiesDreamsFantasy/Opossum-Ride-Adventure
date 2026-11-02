/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * JAHMELLA ROSE - UNIT IV: GEOMETRY & PARAMETRIC SPLINE MECHANICS
 * ============================================================================
 * Mathematical formulation of Bézier splines, spotted circular lattice grids,
 * gold tail helical dashes, and jewelry charm coordinates for Jahmella Rose.
 *
 * Geometric Highlights:
 * - Scaled Body Width: 40 units (transverse cross-section)
 * - Extended Tail Spline: Length +20%, thickness +5% (Cubic Bézier Curve)
 * - Spotted Pattern: 2D regular offset grid of white spotted rings
 * - Outer Ear Geometry: Smooth plain solid conch (zero diamond patterns)
 * - Accessories: 4-inch gold hoop earrings & flower charm pendant
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface CubicBezierControlPoints {
  p0: Point2D;
  p1: Point2D;
  p2: Point2D;
  p3: Point2D;
}

/**
 * Evaluates position B(t) along cubic Bézier spline for parameter t in [0, 1].
 */
export function evaluateCubicBezier2D(
  cp: CubicBezierControlPoints,
  t: number
): Point2D {
  const u = 1.0 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x = uuu * cp.p0.x + 3.0 * uu * t * cp.p1.x + 3.0 * u * tt * cp.p2.x + ttt * cp.p3.x;
  const y = uuu * cp.p0.y + 3.0 * uu * t * cp.p1.y + 3.0 * u * tt * cp.p2.y + ttt * cp.p3.y;

  return { x, y };
}

/**
 * Computes first derivative (velocity / tangent vector) of cubic Bézier curve.
 */
export function evaluateCubicBezierDerivative(
  cp: CubicBezierControlPoints,
  t: number
): Point2D {
  const u = 1.0 - t;
  const dx = 3.0 * u * u * (cp.p1.x - cp.p0.x) + 6.0 * u * t * (cp.p2.x - cp.p1.x) + 3.0 * t * t * (cp.p3.x - cp.p2.x);
  const dy = 3.0 * u * u * (cp.p1.y - cp.p0.y) + 6.0 * u * t * (cp.p2.y - cp.p1.y) + 3.0 * t * t * (cp.p3.y - cp.p2.y);
  return { x: dx, y: dy };
}

/**
 * Calculates local curvature kappa(t) along Bézier curve:
 */
export function calculateBezierCurvature(
  cp: CubicBezierControlPoints,
  t: number
): number {
  const d1 = evaluateCubicBezierDerivative(cp, t);
  const u = 1.0 - t;
  const d2x = 6.0 * u * (cp.p2.x - 2.0 * cp.p1.x + cp.p0.x) + 6.0 * t * (cp.p3.x - 2.0 * cp.p2.x + cp.p1.x);
  const d2y = 6.0 * u * (cp.p2.y - 2.0 * cp.p1.y + cp.p0.y) + 6.0 * t * (cp.p3.y - 2.0 * cp.p2.y + cp.p1.y);

  const numerator = Math.abs(d1.x * d2y - d1.y * d2x);
  const denominator = Math.pow(d1.x * d1.x + d1.y * d1.y, 1.5);
  return denominator > 1e-8 ? numerator / denominator : 0.0;
}

/**
 * Generates regular spotted circle coordinates for Jahmella's coat pattern.
 * Uses an alternating offset grid inside the torso bounding ellipse.
 */
export function generateTorsoSpottedGrid(
  px: number,
  py: number,
  semiAxisX: number = 24.0, // 40 * 0.6
  semiAxisY: number = 25.0,
  step: number = 14.0
): Point2D[] {
  const spots: Point2D[] = [];
  for (let dx = -30; dx <= 30; dx += step) {
    for (let dy = -20; dy <= 20; dy += step) {
      const cx = px + dx + (dy % step === 0 ? 5 : 0);
      const cy = py + dy;

      const nx = (cx - px) / semiAxisX;
      const ny = (cy - py) / semiAxisY;
      if (nx * nx + ny * ny <= 0.88) {
        spots.push({ x: cx, y: cy });
      }
    }
  }
  return spots;
}

/**
 * Jahmella Rose's canonical extended tail spline control points relative to (px, py).
 */
export function getJahmellaTailControlPoints(px: number, py: number): CubicBezierControlPoints {
  return {
    p0: { x: px, y: py + 12 },
    p1: { x: px - 25, y: py + 35 },
    p2: { x: px - 45, y: py + 5 },
    p3: { x: px - 60, y: py + 30 }
  };
}

export default {
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoSpottedGrid,
  getJahmellaTailControlPoints
};
