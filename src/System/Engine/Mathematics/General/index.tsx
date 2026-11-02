/**
 * Opossum Ride Adventure - Mathematics Engine General Specifications
 * License: Apache-2.0
 */

export interface MathGeneralConfig {
  engineName: string;
  version: string;
  precisionDigits: number;
  useScientificNotationThreshold: number;
}

export const MathematicsGeneral: MathGeneralConfig = {
  engineName: "Opossum Ride Ultra-Powerful Mathematics Subsystem Engine",
  version: "1.0.0-scientific",
  precisionDigits: 10,
  useScientificNotationThreshold: 1e12
};

export interface Point2D {
  x: number;
  y: number;
}

export class MathUtils {
  /**
   * Rounds a number to the nearest integer or specified decimal precision.
   */
  public static round(value: number, precision = 0): number {
    if (precision === 0) return Math.round(value);
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  /**
   * Returns the absolute value of a number.
   */
  public static abs(value: number): number {
    return Math.abs(value);
  }

  /**
   * Returns the largest integer less than or equal to a number.
   */
  public static floor(value: number): number {
    return Math.floor(value);
  }

  /**
   * Returns the smallest integer greater than or equal to a number.
   */
  public static ceil(value: number): number {
    return Math.ceil(value);
  }

  /**
   * Returns the minimum of given numbers.
   */
  public static min(...values: number[]): number {
    return Math.min(...values);
  }

  /**
   * Returns the maximum of given numbers.
   */
  public static max(...values: number[]): number {
    return Math.max(...values);
  }

  /**
   * Returns the square root of the sum of squares of its arguments.
   */
  public static hypot(...values: number[]): number {
    return Math.hypot(...values);
  }

  /**
   * Linear interpolation between two values.
   */
  public static lerp(start: number, end: number, amt: number): number {
    return (1 - amt) * start + amt * end;
  }

  /**
   * Clamps a value within specified bounds.
   */
  public static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Computes Euclidean distance between two 2D points.
   */
  public static distance2D(p1: Point2D, p2: Point2D): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculates a quadratic Bezier curve point at t [0, 1].
   */
  public static getQuadraticBezier(p0: Point2D, p1: Point2D, p2: Point2D, t: number): Point2D {
    const term0 = (1 - t) * (1 - t);
    const term1 = 2 * (1 - t) * t;
    const term2 = t * t;

    return {
      x: term0 * p0.x + term1 * p1.x + term2 * p2.x,
      y: term0 * p0.y + term1 * p1.y + term2 * p2.y
    };
  }

  /**
   * Computes the arithmetic mean of a number sequence.
   */
  public static calculateMean(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  }

  /**
   * Computes the standard deviation of a sample sequence.
   */
  public static calculateStandardDeviation(values: number[]): number {
    if (values.length <= 1) return 0;
    const mean = this.calculateMean(values);
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (values.length - 1);
    return Math.sqrt(variance);
  }
}
