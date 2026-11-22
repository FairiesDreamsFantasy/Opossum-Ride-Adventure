/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NumericalStabilizer — IEEE 754 Double-Precision Guard, Compensated Summation,
 * and Singularity Protection Kernel (C / WebAssembly Discipline).
 */

export class MathStabilizer {
  public static readonly DENORMAL_THRESHOLD = 1e-18;
  public static readonly EPSILON = 1e-12;

  public static sanitizeFinite(value: number, fallback: number = 0): number {
    return Number.isFinite(value) ? value : fallback;
  }

  public static clampFinite(value: number, minVal: number, maxVal: number, fallback?: number): number {
    const cleanFallback = fallback !== undefined ? fallback : minVal;
    const clean = this.sanitizeFinite(value, cleanFallback);
    if (clean < minVal) return minVal;
    if (clean > maxVal) return maxVal;
    return clean;
  }

  public static flushDenormal(value: number): number {
    if (!Number.isFinite(value) || Math.abs(value) < this.DENORMAL_THRESHOLD) {
      return 0;
    }
    return value;
  }

  public static safeDivide(numerator: number, denominator: number, fallback: number = 0): number {
    const num = this.sanitizeFinite(numerator, fallback);
    const den = this.sanitizeFinite(denominator, 0);
    if (Math.abs(den) < this.EPSILON) {
      return fallback;
    }
    return this.flushDenormal(num / den);
  }

  public static nearlyEqual(a: number, b: number, tolerance: number = 1e-9): boolean {
    if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
    return Math.abs(a - b) <= tolerance;
  }

  /**
   * Kahan compensated summation eliminates catastrophic floating-point drift over long arrays.
   */
  public static kahanSum(values: readonly number[]): number {
    let sum = 0.0;
    let compensation = 0.0;
    for (let i = 0; i < values.length; i++) {
      const val = this.sanitizeFinite(values[i], 0);
      const y = val - compensation;
      const t = sum + y;
      compensation = (t - sum) - y;
      sum = t;
    }
    return this.flushDenormal(sum);
  }
}
