/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * RUTH KONE-REYNOLDS - UNIT IV: GEOMETRY & PARAMETRIC SPLINE MECHANICS
 * ============================================================================
 * Mathematical formulation of Bézier splines, 25-color flower petal equations,
 * rainbow ear diamond pattern lattice, and jewelry coordinates for Ruth.
 *
 * Geometric Highlights:
 * - Scaled Body Width: 45 units (transverse cross-section)
 * - Winding Tail Spline: Cubic Bézier Curve (Pink `#EC4899`, line width 4.5)
 * - Botanical Flower Motifs: Parametric 5-petal rose curves (diameter 4 inches)
 * - Ear Rainbow Diamond Lattice: 1 cm multi-chromatic rhombic diamond lattice
 * - Accessories: 4-inch yellow hoop earrings & yellow necklace with flower charm
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

export function evaluateCubicBezierDerivative(
  cp: CubicBezierControlPoints,
  t: number
): Point2D {
  const u = 1.0 - t;
  const dx = 3.0 * u * u * (cp.p1.x - cp.p0.x) + 6.0 * u * t * (cp.p2.x - cp.p1.x) + 3.0 * t * t * (cp.p3.x - cp.p2.x);
  const dy = 3.0 * u * u * (cp.p1.y - cp.p0.y) + 6.0 * u * t * (cp.p2.y - cp.p1.y) + 3.0 * t * t * (cp.p3.y - cp.p2.y);
  return { x: dx, y: dy };
}

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
 * Parametric 5-petal flower curve: r(theta) = R * cos(5 * theta)
 * Models Ruth's 4-inch floral body motifs.
 */
export function evaluateBotanicalPetalPoints(
  center: Point2D,
  petalRadius: number = 8.0,
  thetaSteps: number = 40
): Point2D[] {
  const points: Point2D[] = [];
  const dTheta = (2.0 * Math.PI) / thetaSteps;

  for (let i = 0; i <= thetaSteps; i++) {
    const theta = i * dTheta;
    const r = petalRadius * Math.abs(Math.cos(2.5 * theta));
    const x = center.x + r * Math.cos(theta);
    const y = center.y + r * Math.sin(theta);
    points.push({ x, y });
  }

  return points;
}

/**
 * Ruth's canonical tail spline control points relative to (px, py).
 */
export function getRuthTailControlPoints(px: number, py: number): CubicBezierControlPoints {
  return {
    p0: { x: px, y: py + 12 },
    p1: { x: px - 25, y: py + 34 },
    p2: { x: px - 44, y: py + 10 },
    p3: { x: px - 58, y: py + 28 }
  };
}

export default {
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  evaluateBotanicalPetalPoints,
  getRuthTailControlPoints
};
