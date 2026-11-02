/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function evaluateCubicBezier2D(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): [number, number] {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x = uuu * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + ttt * p3[0];
  const y = uuu * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * p3[1];

  return [x, y];
}

export function evaluateCubicBezierDerivative(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): [number, number] {
  const u = 1 - t;
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  return [dx, dy];
}

export function calculateBezierCurvature(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): number {
  const [dx, dy] = evaluateCubicBezierDerivative(p0, p1, p2, p3, t);
  const u = 1 - t;
  const ddx = 6 * u * (p2[0] - 2 * p1[0] + p0[0]) + 6 * t * (p3[0] - 2 * p2[0] + p1[0]);
  const ddy = 6 * u * (p2[1] - 2 * p1[1] + p0[0]) + 6 * t * (p3[1] - 2 * p2[1] + p1[1]);

  const numerator = Math.abs(dx * ddy - dy * ddx);
  const denominator = Math.pow(dx * dx + dy * dy, 1.5);
  return denominator === 0 ? 0 : numerator / denominator;
}

export function generateStaceyBeagleSaddleLattice(
  widthInches: number = 38.5,
  lengthInches: number = 95.9988
): { baseColor: string; saddleColor: string; saddleBounds: { xMin: number; xMax: number; yMin: number; yMax: number } } {
  return {
    baseColor: "#7e22ce", // Purple base
    saddleColor: "#eab308", // Yellow saddle
    saddleBounds: {
      xMin: -widthInches * 0.4,
      xMax: widthInches * 0.4,
      yMin: lengthInches * 0.25,
      yMax: lengthInches * 0.75
    }
  };
}

export function getStaceyTailControlPoints(tailLengthInches: number = 28.0): Array<[number, number]> {
  return [
    [0, 0],
    [tailLengthInches * 0.35, 3.0],
    [tailLengthInches * 0.70, -2.5],
    [tailLengthInches, 1.0]
  ];
}
