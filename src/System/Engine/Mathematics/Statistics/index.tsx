/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LinearRegressionResult {
  slope: number;
  intercept: number;
  r2: number;
}

export interface QuartileResult {
  q1: number;
  q2: number;
  q3: number;
  iqr: number;
}

export class StatisticsEngine {
  /**
   * Arithmetic Mean.
   */
  public static calculateMean(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  /**
   * Median value of a dataset.
   */
  public static calculateMedian(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  /**
   * Mode(s) of a dataset.
   */
  public static calculateMode(numbers: number[]): number[] {
    if (numbers.length === 0) return [];
    const counts = new Map<number, number>();
    let maxFreq = 0;
    for (const n of numbers) {
      const c = (counts.get(n) || 0) + 1;
      counts.set(n, c);
      if (c > maxFreq) maxFreq = c;
    }
    if (maxFreq <= 1) return [];
    const modes: number[] = [];
    counts.forEach((freq, val) => {
      if (freq === maxFreq) modes.push(val);
    });
    return modes.sort((a, b) => a - b);
  }

  /**
   * Variance (sample or population).
   */
  public static calculateVariance(numbers: number[], isSample: boolean = false): number {
    const n = numbers.length;
    if (n <= (isSample ? 1 : 0)) return 0;
    const mean = this.calculateMean(numbers);
    const sumSqDiff = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return sumSqDiff / (isSample ? n - 1 : n);
  }

  /**
   * Standard Deviation.
   */
  public static calculateStandardDeviation(numbers: number[], isSample: boolean = false): number {
    return Math.sqrt(this.calculateVariance(numbers, isSample));
  }

  /**
   * Standard Error of the mean.
   */
  public static calculateStandardError(numbers: number[]): number {
    if (numbers.length <= 1) return 0;
    return this.calculateStandardDeviation(numbers, true) / Math.sqrt(numbers.length);
  }

  /**
   * Minimum value in dataset.
   */
  public static calculateMin(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    return Math.min(...numbers);
  }

  /**
   * Maximum value in dataset.
   */
  public static calculateMax(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    return Math.max(...numbers);
  }

  /**
   * Range (max - min).
   */
  public static calculateRange(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    return Math.max(...numbers) - Math.min(...numbers);
  }

  /**
   * Calculates quartiles (Q1, Q2, Q3) and Interquartile Range (IQR).
   */
  public static calculateQuartiles(numbers: number[]): QuartileResult {
    if (numbers.length === 0) return { q1: 0, q2: 0, q3: 0, iqr: 0 };
    const sorted = [...numbers].sort((a, b) => a - b);
    const q2 = this.calculateMedian(sorted);
    const mid = Math.floor(sorted.length / 2);
    const lowerHalf = sorted.length % 2 === 0 ? sorted.slice(0, mid) : sorted.slice(0, mid);
    const upperHalf = sorted.length % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);

    const q1 = this.calculateMedian(lowerHalf);
    const q3 = this.calculateMedian(upperHalf);
    return { q1, q2, q3, iqr: q3 - q1 };
  }

  /**
   * Computes standardized Z-scores for each data point.
   */
  public static calculateZScores(numbers: number[]): number[] {
    const mean = this.calculateMean(numbers);
    const sd = this.calculateStandardDeviation(numbers);
    if (sd === 0) return numbers.map(() => 0);
    return numbers.map(val => (val - mean) / sd);
  }

  /**
   * Covariance between two equal-length variable sets.
   */
  public static calculateCovariance(x: number[], y: number[]): number {
    const n = Math.min(x.length, y.length);
    if (n <= 1) return 0;
    const meanX = this.calculateMean(x.slice(0, n));
    const meanY = this.calculateMean(y.slice(0, n));
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += (x[i] - meanX) * (y[i] - meanY);
    }
    return sum / n;
  }

  /**
   * Pearson product-moment correlation coefficient r.
   */
  public static calculatePearsonCorrelation(x: number[], y: number[]): number {
    const n = Math.min(x.length, y.length);
    if (n <= 1) return 0;
    const cov = this.calculateCovariance(x, y);
    const sdX = this.calculateStandardDeviation(x.slice(0, n));
    const sdY = this.calculateStandardDeviation(y.slice(0, n));
    if (sdX === 0 || sdY === 0) return 0;
    return cov / (sdX * sdY);
  }

  /**
   * Ordinary Least Squares linear regression: y = slope * x + intercept.
   */
  public static linearRegression(x: number[], y: number[]): LinearRegressionResult {
    const n = Math.min(x.length, y.length);
    if (n <= 1) return { slope: 0, intercept: 0, r2: 0 };
    const meanX = this.calculateMean(x.slice(0, n));
    const meanY = this.calculateMean(y.slice(0, n));

    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
      num += (x[i] - meanX) * (y[i] - meanY);
      den += Math.pow(x[i] - meanX, 2);
    }

    const slope = den !== 0 ? num / den : 0;
    const intercept = meanY - slope * meanX;
    const r = this.calculatePearsonCorrelation(x, y);
    return {
      slope,
      intercept,
      r2: Math.pow(r, 2)
    };
  }
}

