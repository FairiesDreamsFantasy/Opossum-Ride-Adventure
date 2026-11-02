/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - R Statistical Distributions & Matrix Covariance
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Box-Muller Normal distributions, mean, variance, and standard deviations
 */

/**
 * Generates an independent, standard normally distributed pseudo-random double (Gaussian distribution)
 * using the Box-Muller transform method.
 * Mean = 0, Standard Deviation = 1
 */
export function rnormBoxMuller(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); // Converting interval (0,1] to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Calculates the arithmetic mean of a statistical vector.
 */
export function calculateMean(vector: number[]): number {
  if (vector.length === 0) return 0;
  const sum = vector.reduce((acc, v) => acc + v, 0);
  return sum / vector.length;
}

/**
 * Calculates the sample variance (N - 1 denominator) of a statistical vector.
 */
export function calculateVariance(vector: number[]): number {
  if (vector.length < 2) return 0;
  const mean = calculateMean(vector);
  const squaredDiffs = vector.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  return squaredDiffs / (vector.length - 1);
}

/**
 * Calculates standard deviation.
 */
export function calculateStandardDeviation(vector: number[]): number {
  return Math.sqrt(calculateVariance(vector));
}

/**
 * Calculates covariance between two matched-size statistical vectors.
 */
export function calculateCovariance(xVec: number[], yVec: number[]): number {
  if (xVec.length !== yVec.length || xVec.length < 2) {
    throw new Error("[R Statistics] Covariance size mismatch or sample size too small");
  }
  const xMean = calculateMean(xVec);
  const yMean = calculateMean(yVec);
  let sumProd = 0;
  for (let i = 0; i < xVec.length; i++) {
    sumProd += (xVec[i] - xMean) * (yVec[i] - yMean);
  }
  return sumProd / (xVec.length - 1);
}
