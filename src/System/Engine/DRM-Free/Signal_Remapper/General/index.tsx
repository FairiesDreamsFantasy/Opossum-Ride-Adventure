/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Signal_Remapper General: Mathematical Scaling & Modulation
 */

export class SignalModulationMath {
  /**
   * Performs Bicubic Spline Interpolation for high-fidelity upscaling.
   */
  public static cubicInterpolate(p: number[], x: number): number {
    return p[1] + 0.5 * x * (p[2] - p[0] + x * (2.0 * p[0] - 5.0 * p[1] + 4.0 * p[2] - p[3] + x * (3.0 * (p[1] - p[2]) + p[3] - p[0])));
  }

  /**
   * Remaps a color coordinate from an 8-bit space to a 10-bit HDR-ready space.
   */
  public static remapColorDepth(val8bit: number): number {
    return Math.round((val8bit / 255) * 1023);
  }
}

export default SignalModulationMath;
