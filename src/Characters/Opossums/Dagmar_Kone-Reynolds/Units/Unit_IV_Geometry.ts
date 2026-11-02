/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * DAGMAR KONE-REYNOLDS - UNIT IV: GEOMETRY & PARAMETRIC SPLINE MECHANICS
 * ============================================================================
 * Mathematical formulation of Bézier splines, multi-colored diamond grid,
 * extended ear conch geometry, and jewelry coordinates for Dagmar.
 *
 * Geometric Highlights:
 * - Scaled Body Width: 40 units (transverse cross-section)
 * - Tail Spline with Silver Wrap: Pink core with helical silver wrap-around stripes
 * - Extended Ear Conches: Long vertical profile (54 in total with ears vs 44 in head)
 * - Ear Diamond Grid: Cream diamond pattern overlays on white conch
 * - Accessories: Pink 4-inch hoop earrings & silver necklace with diamond charm
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
 * Generates diamond lattice coordinates on Dagmar's outer ear conches.
 */
export function generateEarDiamondLattice(
  earCenter: Point2D,
  conchHeight: number = 24.0,
  conchWidth: number = 10.0,
  diamondSpan: number = 5.0
): Point2D[] {
  const points: Point2D[] = [];
  const startY = earCenter.y - conchHeight * 0.45;
  const endY = earCenter.y + conchHeight * 0.45;

  for (let y = startY; y <= endY; y += diamondSpan) {
    const normY = (y - earCenter.y) / (conchHeight * 0.5);
    const localWidth = conchWidth * Math.sqrt(Math.max(0, 1.0 - normY * normY));
    for (let x = earCenter.x - localWidth * 0.7; x <= earCenter.x + localWidth * 0.7; x += diamondSpan) {
      points.push({ x, y });
    }
  }
  return points;
}

/**
 * Dagmar's canonical tail spline control points relative to (px, py).
 */
export function getDagmarTailControlPoints(px: number, py: number): CubicBezierControlPoints {
  return {
    p0: { x: px, y: py + 12 },
    p1: { x: px - 24, y: py + 32 },
    p2: { x: px - 42, y: py + 8 },
    p3: { x: px - 56, y: py + 26 }
  };
}

export default {
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateEarDiamondLattice,
  getDagmarTailControlPoints
};
