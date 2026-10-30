/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ARDEN-ROSIE KONE-REYNOLDS - UNIT IV: GEOMETRY & PARAMETRIC SPLINE MECHANICS
 * ============================================================================
 * Mathematical formulation of Bézier splines, diamond pattern tessellation grid,
 * solid outer ear geometry, and jewelry coordinates for Arden-Rosie.
 *
 * Geometric Highlights:
 * - Scaled Body Width: 38 units (transverse cross-section)
 * - Winding Tail Spline: Cubic Bézier Curve (Dark Pink, line width 4.5)
 * - Outer Ear Conch: Plain solid subtle cream (authentic zero diamond patterns)
 * - Torso Diamond Lattice: Parametric rhombic tessellation across cream fur
 * - Jewelry: Gold 4-inch hoop earrings & heart charm necklace
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
 * Generates regular rhombic diamond tessellation vertices across Arden-Rosie's torso fur.
 */
export function generateTorsoDiamondLattice(
  px: number,
  py: number,
  semiAxisX: number = 23.5,
  semiAxisY: number = 24.0,
  diamondSpanX: number = 8.0,
  diamondSpanY: number = 10.0
): { center: Point2D; top: Point2D; right: Point2D; bottom: Point2D; left: Point2D }[] {
  const diamonds: { center: Point2D; top: Point2D; right: Point2D; bottom: Point2D; left: Point2D }[] = [];

  for (let dy = -20; dy <= 20; dy += diamondSpanY) {
    const rowOffset = (dy / diamondSpanY) % 2 === 0 ? 0 : diamondSpanX * 0.5;
    for (let dx = -25; dx <= 25; dx += diamondSpanX) {
      const cx = px + dx + rowOffset;
      const cy = py + dy;

      const nx = (cx - px) / semiAxisX;
      const ny = (cy - py) / semiAxisY;
      if (nx * nx + ny * ny <= 0.85) {
        diamonds.push({
          center: { x: cx, y: cy },
          top: { x: cx, y: cy - diamondSpanY * 0.45 },
          right: { x: cx + diamondSpanX * 0.45, y: cy },
          bottom: { x: cx, y: cy + diamondSpanY * 0.45 },
          left: { x: cx - diamondSpanX * 0.45, y: cy }
        });
      }
    }
  }

  return diamonds;
}

/**
 * Arden-Rosie's canonical tail spline control points relative to (px, py).
 */
export function getArdenRosieTailControlPoints(px: number, py: number): CubicBezierControlPoints {
  return {
    p0: { x: px, y: py + 12 },
    p1: { x: px - 22, y: py + 30 },
    p2: { x: px - 36, y: py + 10 },
    p3: { x: px - 48, y: py + 24 }
  };
}

export default {
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getArdenRosieTailControlPoints
};
