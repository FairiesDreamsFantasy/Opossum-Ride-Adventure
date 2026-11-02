/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathAlgebra {
  public static solveLinear(a: number, b: number): number {
    // ax + b = 0 => x = -b/a
    return a !== 0 ? -b / a : 0;
  }
}
