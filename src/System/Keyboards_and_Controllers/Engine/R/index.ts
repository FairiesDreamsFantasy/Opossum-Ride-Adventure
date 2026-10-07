/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * R Input Latency Statistics & Tap Interval Variance
 */

export class RInputStatisticalEngine {
  public static calculateAverageInterval(intervalsMs: number[]): number {
    if (intervalsMs.length === 0) return 0;
    const sum = intervalsMs.reduce((a, b) => a + b, 0);
    return sum / intervalsMs.length;
  }
}

export default RInputStatisticalEngine;
