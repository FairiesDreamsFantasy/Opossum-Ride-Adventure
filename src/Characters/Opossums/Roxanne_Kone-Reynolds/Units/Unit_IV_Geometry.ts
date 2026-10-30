/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ROXANNE KONE-REYNOLDS - UNIT IV: GEOMETRY & PARAMETRIC SPLINE MECHANICS
 * ============================================================================
 * Mathematical formulation of Bézier splines, red ear diamond linear array,
 * torso bordered diamond tessellation, and jewelry coordinates for Roxanne.
 *
 * Geometric Highlights:
 * - Scaled Body Width: 45 units (transverse cross-section)
 * - Winding Tail Spline: Cubic Bézier Curve (Pink with yellow fleck accent)
 * - Ear Diamond Grid: Linear array of red rhombic diamonds spaced by 0.1 inches
 * - Torso Diamond Lattice: Multi-colored diamonds bordered in red-orange
 * - Accessories: 4-inch emerald green hoop earrings & red diamond heart necklace
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
 * Computes coordinates for Roxanne's outer ear red diamonds spaced out by 0.1 inches (~2.54 mm).
 */
export function generateEarRedDiamondArray(
  earCenter: Point2D,
  count: number = 3,
  spacingY: number = 4.5
): Point2D[] {
  const diamonds: Point2D[] = [];
  const startY = earCenter.y - ((count - 1) * spacingY) / 2;
  for (let i = 0; i < count; i++) {
    diamonds.push({
      x: earCenter.x,
      y: startY + i * spacingY
    });
  }
  return diamonds;
}

/**
 * Roxanne's canonical tail spline control points relative to (px, py).
 */
export function getRoxanneTailControlPoints(px: number, py: number): CubicBezierControlPoints {
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
  generateEarRedDiamondArray,
  getRoxanneTailControlPoints
};
