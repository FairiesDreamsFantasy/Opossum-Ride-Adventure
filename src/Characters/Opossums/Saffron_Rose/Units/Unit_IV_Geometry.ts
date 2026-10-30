/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * SAFFRON ROSE - UNIT IV: GEOMETRY & PARAMETRIC SPLINE MECHANICS
 * ============================================================================
 * Mathematical formulation of Bézier splines, 4x4 affine coordinate frames,
 * ear polka-dot tessellation lattice, and necklace charm geometry for Saffron Rose.
 *
 * Geometric Highlights:
 * - Scaled Body Width: 48 units (transverse cross-section)
 * - Tail Spline: Cubic Bézier Curve with pink helical wrap-around stripes
 * - Ear Lattice: Hexagonal 2D circle packing for neon saffron polka-dots
 * - Accessory Geometry: Green faceted diamond necklace with heart pendant
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface CubicBezierControlPoints {
  p0: Point2D;
  p1: Point2D;
  p2: Point2D;
  p3: Point2D;
}

export interface Matrix4x4 {
  m: number[]; // 16 elements row-major
}

/**
 * Evaluates position B(t) along a 2D cubic Bézier spline for parameter t in [0, 1].
 * B(t) = (1-t)^3 * P0 + 3*(1-t)^2 * t * P1 + 3*(1-t) * t^2 * P2 + t^3 * P3
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
 * Computes first derivative (velocity / tangent vector) of cubic Bézier curve at parameter t.
 * B'(t) = 3*(1-t)^2 * (P1 - P0) + 6*(1-t)*t * (P2 - P1) + 3*t^2 * (P3 - P2)
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
 * kappa(t) = |x' * y'' - y' * x''| / (x'^2 + y'^2)^(3/2)
 */
export function calculateBezierCurvature(
  cp: CubicBezierControlPoints,
  t: number
): number {
  const d1 = evaluateCubicBezierDerivative(cp, t);
  const u = 1.0 - t;
  // Second derivative: B''(t) = 6*(1-t)*(P2 - 2*P1 + P0) + 6*t*(P3 - 2*P2 + P1)
  const d2x = 6.0 * u * (cp.p2.x - 2.0 * cp.p1.x + cp.p0.x) + 6.0 * t * (cp.p3.x - 2.0 * cp.p2.x + cp.p1.x);
  const d2y = 6.0 * u * (cp.p2.y - 2.0 * cp.p1.y + cp.p0.y) + 6.0 * t * (cp.p3.y - 2.0 * cp.p2.y + cp.p1.y);

  const numerator = Math.abs(d1.x * d2y - d1.y * d2x);
  const denominator = Math.pow(d1.x * d1.x + d1.y * d1.y, 1.5);
  return denominator > 1e-8 ? numerator / denominator : 0.0;
}

/**
 * Generates regular hexagonal circle-packing lattice coordinates for Saffron's ear polka dots.
 * Ensures uniform distribution across ear conch without overlapping bounds.
 */
export function generatePolkaDotLattice(
  center: Point2D,
  radiusX: number,
  radiusY: number,
  dotRadius: number = 2.2,
  spacing: number = 6.5
): Point2D[] {
  const dots: Point2D[] = [];
  const rowHeight = spacing * (Math.sqrt(3) / 2);

  const startY = center.y - radiusY + dotRadius;
  const endY = center.y + radiusY - dotRadius;
  const startX = center.x - radiusX + dotRadius;
  const endX = center.x + radiusX - dotRadius;

  let row = 0;
  for (let y = startY; y <= endY; y += rowHeight) {
    const xOffset = (row % 2 === 1) ? spacing * 0.5 : 0.0;
    for (let x = startX + xOffset; x <= endX; x += spacing) {
      // Check normalized ellipse interior: (dx/rx)^2 + (dy/ry)^2 <= 0.85
      const nx = (x - center.x) / radiusX;
      const ny = (y - center.y) / radiusY;
      if (nx * nx + ny * ny <= 0.82) {
        dots.push({ x, y });
      }
    }
    row++;
  }
  return dots;
}

/**
 * Saffron Rose's canonical tail spline definition relative to body anchor (px, py).
 */
export function getSaffronTailControlPoints(px: number, py: number): CubicBezierControlPoints {
  return {
    p0: { x: px, y: py + 14 },
    p1: { x: px - 24, y: py + 34 },
    p2: { x: px - 40, y: py + 12 },
    p3: { x: px - 52, y: py + 28 }
  };
}

export default {
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generatePolkaDotLattice,
  getSaffronTailControlPoints
};
