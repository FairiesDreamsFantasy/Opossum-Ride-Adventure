/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathTrigonometry {
  public static sin(radians: number): number { return Math.sin(radians); }
  public static cos(radians: number): number { return Math.cos(radians); }
  public static tan(radians: number): number { return Math.tan(radians); }
  public static toRadians(degrees: number): number { return degrees * (Math.PI / 180); }
  public static toDegrees(radians: number): number { return radians * (180 / Math.PI); }
}
