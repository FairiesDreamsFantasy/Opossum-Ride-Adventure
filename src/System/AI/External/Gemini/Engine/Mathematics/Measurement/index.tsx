/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathMeasurement {
  public static feetToMeters(feet: number): number {
    return feet * 0.3048;
  }
  public static metersToFeet(meters: number): number {
    return meters / 0.3048;
  }
}
