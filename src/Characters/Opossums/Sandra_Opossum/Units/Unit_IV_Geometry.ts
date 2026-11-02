/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * SANDRA OPOSSUM - UNIT IV: GEOMETRY & PARAMETRIC MESH CURVATURE
 * ============================================================================
 * Cubic Bézier spine curves, Frenet-Serret frame calculations, surface curvature
 * equations, and toroidal lattice generators for Sandra Opossum.
 */

export interface Vector2D {
  x: number;
  y: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export function evaluateCubicBezier2D(p0: Vector2D, p1: Vector2D, p2: Vector2D, p3: Vector2D, t: number): Vector2D {
  const u = 1.0 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  let x = uuu * p0.x;
  x += 3.0 * uu * t * p1.x;
  x += 3.0 * u * tt * p2.x;
  x += ttt * p3.x;

  let y = uuu * p0.y;
  y += 3.0 * uu * t * p1.y;
  y += 3.0 * u * tt * p2.y;
  y += ttt * p3.y;

  return { x, y };
}

export function evaluateCubicBezierDerivative(p0: Vector2D, p1: Vector2D, p2: Vector2D, p3: Vector2D, t: number): Vector2D {
  const u = 1.0 - t;
  const dx = 3.0 * u * u * (p1.x - p0.x) + 6.0 * u * t * (p2.x - p1.x) + 3.0 * t * t * (p3.x - p2.x);
  const dy = 3.0 * u * u * (p1.y - p0.y) + 6.0 * u * t * (p2.y - p1.y) + 3.0 * t * t * (p3.y - p2.y);
  return { x: dx, y: dy };
}

export function calculateBezierCurvature(p0: Vector2D, p1: Vector2D, p2: Vector2D, p3: Vector2D, t: number): number {
  const d = evaluateCubicBezierDerivative(p0, p1, p2, p3, t);
  const u = 1.0 - t;
  const ddx = 6.0 * u * (p2.x - 2.0 * p1.x + p0.x) + 6.0 * t * (p3.x - 2.0 * p2.x + p1.x);
  const ddy = 6.0 * u * (p2.y - 2.0 * p1.y + p0.y) + 6.0 * t * (p3.y - 2.0 * p2.y + p1.y);

  const numerator = Math.abs(d.x * ddy - d.y * ddx);
  const denominator = Math.pow(d.x * d.x + d.y * d.y, 1.5);
  if (denominator === 0) return 0.0;
  return numerator / denominator;
}

export function generateTorsoDiamondLattice(rows: number, cols: number, radius: number): Vector3D[][] {
  const lattice: Vector3D[][] = [];
  for (let r = 0; r < rows; r++) {
    const rowPoints: Vector3D[] = [];
    const phi = (r / (rows - 1)) * Math.PI;
    for (let c = 0; c < cols; c++) {
      const theta = (c / (cols - 1)) * 2.0 * Math.PI;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      rowPoints.push({ x, y, z });
    }
    lattice.push(rowPoints);
  }
  return lattice;
}

export function getSandraOpossumTailControlPoints(): Vector2D[] {
  return [
    { x: 0.0, y: 0.0 },
    { x: 11.2, y: 15.2 },
    { x: 23.2, y: -5.2 },
    { x: 31.2, y: 13.2 }
  ];
}

export default {
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getSandraOpossumTailControlPoints
};
