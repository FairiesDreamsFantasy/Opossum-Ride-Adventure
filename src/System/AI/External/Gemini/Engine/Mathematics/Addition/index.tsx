/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathAddition {
  public static add(a: number, b: number): number {
    return a + b;
  }
  public static sum(values: number[]): number {
    return values.reduce((a, b) => a + b, 0);
  }
}
