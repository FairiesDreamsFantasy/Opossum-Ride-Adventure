/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GrayscaleHistogramSolver — 256-Bin Luminance Histogram & Otsu Binarization Threshold.
 */

export class GrayscaleHistogramSolver {
  public static computeHistogram256(luminances: readonly number[]): Uint32Array {
    const bins = new Uint32Array(256);
    if (!luminances || luminances.length === 0) return bins;
    for (let i = 0; i < luminances.length; i++) {
      const val = Number.isFinite(luminances[i]) ? Math.max(0, Math.min(255, Math.round(luminances[i]))) : 0;
      bins[val]++;
    }
    return bins;
  }

  public static computeOtsuThreshold(luminances: readonly number[]): number {
    if (!luminances || luminances.length === 0) return 128;
    const hist = this.computeHistogram256(luminances);
    const total = luminances.length;

    let sumAll = 0;
    for (let i = 0; i < 256; i++) sumAll += i * hist[i];

    let sumBg = 0;
    let weightBg = 0;
    let maxVariance = -1;
    let bestThreshold = 128;

    for (let t = 0; t < 256; t++) {
      weightBg += hist[t];
      if (weightBg === 0) continue;
      const weightFg = total - weightBg;
      if (weightFg === 0) break;

      sumBg += t * hist[t];
      const meanBg = sumBg / weightBg;
      const meanFg = (sumAll - sumBg) / weightFg;
      const betweenVariance = weightBg * weightFg * (meanBg - meanFg) * (meanBg - meanFg);
      if (betweenVariance > maxVariance) {
        maxVariance = betweenVariance;
        bestThreshold = t;
      }
    }
    return bestThreshold;
  }
}
