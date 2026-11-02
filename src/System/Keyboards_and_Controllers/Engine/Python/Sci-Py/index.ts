/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SciPy Input Curve Smoothing & Acceleration Splines
 */

export class SciPyInputCurveEngine {
  public static smoothAnalogInput(raw: number, exponent: number = 2.0): number {
    const sign = Math.sign(raw);
    return sign * Math.pow(Math.abs(raw), exponent);
  }
}

export default SciPyInputCurveEngine;
