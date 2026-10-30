/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * KADY ROSE - UNIT IV: GEOMETRY & PARAMETRIC SPLINE MECHANICS
 * ============================================================================
 * Mathematical formulation of Bézier splines, bronze ear circle coordinates,
 * heart charm parametric equations, and jewelry coordinates for Kady Rose.
 *
 * Geometric Highlights:
 * - Scaled Body Width: 48 units (transverse cross-section)
 * - Winding Tail Spline: Cubic Bézier Curve (Red-Orange, line width 4.5)
 * - Outer Ear Conch: Light gray conch with concentric 1.5 cm bronze circular discs
 * - Neck Ornament: Red beaded cord with pink heart-shaped charm
 * - Ear Jewelry: Gold 3-inch circular hoop earrings
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
 * Computes bronze circular disc positions on Kady's light gray outer ears.
 */
export function getKadyEarBronzeCircles(x: number, y: number): { leftCircle: Point2D; rightCircle: Point2D; radius: number } {
  return {
    leftCircle: { x: x - 18, y: y - 22 },
    rightCircle: { x: x + 18, y: y - 22 },
    radius: 2.5
  };
}

/**
 * Parametric heart curve formulation for Kady's pink heart charm:
 * x(theta) = 16 * sin^3(theta)
 * y(theta) = 13 * cos(theta) - 5 * cos(2*theta) - 2 * cos(3*theta) - cos(4*theta)
 */
export function evaluateHeartCharmCurve(center: Point2D, scale: number = 0.22, thetaSteps: number = 32): Point2D[] {
  const points: Point2D[] = [];
  const dTheta = (2.0 * Math.PI) / thetaSteps;

  for (let i = 0; i <= thetaSteps; i++) {
    const theta = i * dTheta;
    const sinT = Math.sin(theta);
    const x = center.x + scale * (16 * Math.pow(sinT, 3));
    const y = center.y - scale * (13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta));
    points.push({ x, y });
  }

  return points;
}

/**
 * Kady Rose's canonical tail spline control points relative to (x, y).
 */
export function getKadyTailControlPoints(x: number, y: number): CubicBezierControlPoints {
  return {
    p0: { x: x, y: y + 12 },
    p1: { x: x - 24, y: y + 32 },
    p2: { x: x - 40, y: y + 12 },
    p3: { x: x - 52, y: y + 28 }
  };
}

export default {
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  getKadyEarBronzeCircles,
  evaluateHeartCharmCurve,
  getKadyTailControlPoints
};
