/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * R Sound Statistical Decibel Distribution & Acoustic Analysis
 */

export class RSoundStatisticalEngine {
  public static calculateAverageDecibels(dbValues: number[]): number {
    if (dbValues.length === 0) return -100;
    const sumPower = dbValues.reduce((acc, db) => acc + Math.pow(10, db / 10), 0);
    return 10 * Math.log10(sumPower / dbValues.length);
  }
}

export default RSoundStatisticalEngine;
