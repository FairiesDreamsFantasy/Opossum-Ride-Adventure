/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathIntegers {
  public static isEven(n: number): boolean {
    return n % 2 === 0;
  }
  public static isOdd(n: number): boolean {
    return Math.abs(n % 2) === 1;
  }
}
