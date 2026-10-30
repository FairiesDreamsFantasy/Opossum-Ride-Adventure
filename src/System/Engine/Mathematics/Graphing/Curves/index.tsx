import { Point2D } from "../Coordinates";

export class CurvesEngine {
  /** Quadratic Bézier interpolation: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2 */
  public static quadraticBezier(p0: Point2D, p1: Point2D, p2: Point2D, t: number): Point2D {
    const oneMinusT = 1 - t;
    const a = oneMinusT * oneMinusT;
    const b = 2 * oneMinusT * t;
    const c = t * t;

    return {
      x: a * p0.x + b * p1.x + c * p2.x,
      y: a * p0.y + b * p1.y + c * p2.y
    };
  }

  /** Cubic Bézier interpolation */
  public static cubicBezier(p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D, t: number): Point2D {
    const oneMinusT = 1 - t;
    const a = oneMinusT * oneMinusT * oneMinusT;
    const b = 3 * oneMinusT * oneMinusT * t;
    const c = 3 * oneMinusT * t * t;
    const d = t * t * t;

    return {
      x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
      y: a * p0.y + b * p1.y + c * p2.y + d * p3.y
    };
  }

  /** Linear interpolation between two scalar numbers */
  public static lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }
}
