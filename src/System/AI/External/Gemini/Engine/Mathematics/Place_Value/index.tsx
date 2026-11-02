/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathPlaceValue {
  public static getDigit(n: number, position: number): number {
    return Math.floor(Math.abs(n) / Math.pow(10, position)) % 10;
  }
}
