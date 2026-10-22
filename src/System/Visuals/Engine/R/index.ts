/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * R Statistical Visuals & Distribution Curve Engine
 */

export class RStatisticalVisualEngine {
  public static calculateGaussianWeight(distance: number, sigma: number = 1.0): number {
    return Math.exp(-(distance * distance) / (2 * sigma * sigma)) / (Math.sqrt(2 * Math.PI) * sigma);
  }

  public static quantileInterpolation(values: number[], q: number): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    }
    return sorted[base];
  }
}

export default RStatisticalVisualEngine;
