import { AdditionGeneral } from "./General";

export class AdditionEngine {
  /**
   * Deterministic binary scalar addition.
   */
  public static add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Calculates sum of an array of scalar numbers.
   */
  public static sumArray(values: number[]): number {
    return values.reduce((acc, val) => acc + val, 0);
  }

  /**
   * High-precision Kahan summation algorithm to significantly reduce
   * numerical error in the total obtained by adding a sequence of finite-precision
   * floating-point numbers.
   */
  public static kahanSum(values: number[]): number {
    let sum = 0.0;
    let c = 0.0; // A running compensation for lost low-order bits.
    for (let i = 0; i < values.length; i++) {
      const y = values[i] - c;
      const t = sum + y;
      c = (t - sum) - y;
      sum = t;
    }
    return sum;
  }

  /**
   * Component-wise addition of two numerical vectors.
   */
  public static addVectors(a: number[], b: number[]): number[] {
    const len = Math.max(a.length, b.length);
    const result: number[] = new Array(len);
    for (let i = 0; i < len; i++) {
      result[i] = (a[i] || 0) + (b[i] || 0);
    }
    return result;
  }

  /**
   * Increments a value by an explicit step.
   */
  public static increment(value: number, step: number = 1): number {
    return value + step;
  }

  /**
   * Adds an array of numbers to an existing base value.
   */
  public static accumulate(base: number, values: number[]): number {
    return base + this.kahanSum(values);
  }

  /**
   * Linear additive interpolation between two points.
   */
  public static lerpAddition(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  /**
   * Adds two numbers with an upper saturation ceiling.
   */
  public static addWithLimit(a: number, b: number, maxLimit: number = Number.MAX_SAFE_INTEGER): number {
    return Math.min(maxLimit, a + b);
  }

  public static getGeneralConfig() {
    return AdditionGeneral;
  }
}

