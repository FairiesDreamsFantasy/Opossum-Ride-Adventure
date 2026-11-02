/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI R Language Types
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Array matrices, vectors bounds, and scientific dataframe properties
 */

export interface GeminiRDataFrame {
  columnNames: string[];
  data: number[][]; // Row-by-column numeric dataset
}

export class GeminiRMath {
  public static dot(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error("[R Math] DimensionMismatch: vectors must be of identical length");
    }
    return a.reduce((sum, val, idx) => sum + val * b[idx], 0);
  }
}
