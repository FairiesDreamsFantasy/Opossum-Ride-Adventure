import { MultiplicationGeneral } from "./General";

export class MultiplicationEngine {
  /**
   * Deterministic scalar multiplication: a * b.
   */
  public static multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Scales a scalar value by a factor.
   */
  public static scale(value: number, factor: number): number {
    return value * factor;
  }

  /**
   * Multiplies an array of scalar numbers together.
   */
  public static multiplyArray(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((acc, val) => acc * val, 1);
  }

  /**
   * Scales all components in a numerical vector by a factor.
   */
  public static scaleVector(v: number[], factor: number): number[] {
    return v.map(component => component * factor);
  }

  /**
   * Exponentiation: base^exponent.
   */
  public static power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  /**
   * Returns n^2.
   */
  public static square(n: number): number {
    return n * n;
  }

  /**
   * Returns n^3.
   */
  public static cube(n: number): number {
    return n * n * n;
  }

  /**
   * Calculates factorial n! for non-negative integers.
   */
  public static factorial(n: number): number {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= Math.min(n, 170); i++) {
      result *= i;
    }
    return result;
  }

  /**
   * 2D Cross product magnitude: x1*y2 - y1*x2.
   */
  public static crossProduct2D(x1: number, y1: number, x2: number, y2: number): number {
    return x1 * y2 - y1 * x2;
  }

  /**
   * Dot product of two numerical arrays.
   */
  public static dotProduct(a: number[], b: number[]): number {
    const len = Math.min(a.length, b.length);
    let dot = 0;
    for (let i = 0; i < len; i++) {
      dot += a[i] * b[i];
    }
    return dot;
  }

  public static getGeneralConfig() {
    return MultiplicationGeneral;
  }
}

