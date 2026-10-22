/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathDivision {
  public static divide(numerator: number, denominator: number): number {
    if (denominator === 0) return 0;
    return numerator / denominator;
  }
  public static safeDivide(numerator: number, denominator: number, fallback: number = 0): number {
    if (denominator === 0) return fallback;
    return numerator / denominator;
  }
}
