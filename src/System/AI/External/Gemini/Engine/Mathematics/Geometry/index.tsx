/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathGeometry {
  public static calculateAreaCircle(radius: number): number {
    return Math.PI * radius * radius;
  }
  public static calculateHypotenuse(a: number, b: number): number {
    return Math.sqrt(a * a + b * b);
  }
}
