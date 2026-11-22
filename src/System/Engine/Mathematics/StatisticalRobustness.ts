/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * StatisticalRobustness — Outlier-Resistant Telemetry & Frame Smoothing Solvers.
 */

import { MathStabilizer } from "./NumericalStabilizer";

export class RobustStatisticsSolver {
  public static median(values: readonly number[]): number {
    const clean = values.filter((v) => Number.isFinite(v)).sort((a, b) => a - b);
    if (!clean.length) return 0;
    const mid = Math.floor(clean.length / 2);
    return clean.length % 2 !== 0 ? clean[mid] : (clean[mid - 1] + clean[mid]) * 0.5;
  }

  public static trimmedMean(values: readonly number[], trimFraction: number = 0.15): number {
    const clean = values.filter((v) => Number.isFinite(v)).sort((a, b) => a - b);
    if (!clean.length) return 0;
    const frac = MathStabilizer.clampFinite(trimFraction, 0, 0.45, 0.15);
    const cut = Math.floor(clean.length * frac);
    const slice = clean.slice(cut, clean.length - cut);
    if (!slice.length) return this.median(clean);
    return MathStabilizer.kahanSum(slice) / slice.length;
  }

  public static exponentialMovingAverage(prevAvg: number, sample: number, alpha: number = 0.2): number {
    const safeAlpha = MathStabilizer.clampFinite(alpha, 0.001, 1.0, 0.2);
    const prev = MathStabilizer.sanitizeFinite(prevAvg, sample);
    const cur = MathStabilizer.sanitizeFinite(sample, prev);
    return MathStabilizer.flushDenormal(prev + safeAlpha * (cur - prev));
  }
}
