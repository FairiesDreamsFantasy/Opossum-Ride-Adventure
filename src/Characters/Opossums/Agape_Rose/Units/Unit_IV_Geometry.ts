/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function evaluateCubicBezier2D(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
  };
}

export function evaluateCubicBezierDerivative(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
) {
  const u = 1 - t;
  return {
    x: 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x),
    y: 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y)
  };
}

export function calculateBezierCurvature(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
): number {
  const d1 = evaluateCubicBezierDerivative(p0, p1, p2, p3, t);
  const num = Math.abs(d1.x * d1.y - d1.y * d1.x);
  const den = Math.pow(d1.x * d1.x + d1.y * d1.y, 1.5);
  return den === 0 ? 0 : num / den;
}

export function generateTorsoDiamondLattice(width: number, length: number) {
  return [
    { x: 0, y: -length / 2 },
    { x: width / 2, y: 0 },
    { x: 0, y: length / 2 },
    { x: -width / 2, y: 0 }
  ];
}

export function getAgapeRoseTailControlPoints() {
  return [
    { x: 0, y: 0 },
    { x: 15, y: -10 },
    { x: 25, y: -5 },
    { x: 40, y: 0 }
  ];
}

export default {
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getAgapeRoseTailControlPoints
};
