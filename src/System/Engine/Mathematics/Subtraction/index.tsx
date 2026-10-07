import { SubtractionGeneral } from "./General";

export class SubtractionEngine {
  /**
   * Deterministic scalar subtraction: a - b.
   */
  public static subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Calculates rate-of-change or transition delta: current - previous.
   */
  public static calculateDelta(current: number, previous: number): number {
    return current - previous;
  }

  /**
   * Absolute mathematical difference between two numbers: |a - b|.
   */
  public static difference(a: number, b: number): number {
    return Math.abs(a - b);
  }

  /**
   * Component-wise subtraction of two numerical vectors: a - b.
   */
  public static subtractVectors(a: number[], b: number[]): number[] {
    const len = Math.max(a.length, b.length);
    const result: number[] = new Array(len);
    for (let i = 0; i < len; i++) {
      result[i] = (a[i] || 0) - (b[i] || 0);
    }
    return result;
  }

  /**
   * Decrements a numerical value by an explicit step.
   */
  public static decrement(value: number, step: number = 1): number {
    return value - step;
  }

  /**
   * Subtracts with a floor threshold to prevent negative values or underflows.
   */
  public static clampedSubtract(val: number, sub: number, minBound: number = 0): number {
    return Math.max(minBound, val - sub);
  }

  /**
   * Computes numerical prediction error / residual: observed - expected.
   */
  public static calculateResidual(observed: number, expected: number): number {
    return observed - expected;
  }

  public static getGeneralConfig() {
    return SubtractionGeneral;
  }
}

