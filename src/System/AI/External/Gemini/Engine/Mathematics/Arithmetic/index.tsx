/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathArithmetic {
  public static add(a: number, b: number): number { return a + b; }
  public static subtract(a: number, b: number): number { return a - b; }
  public static multiply(a: number, b: number): number { return a * b; }
  public static divide(a: number, b: number): number { return b !== 0 ? a / b : 0; }
}
