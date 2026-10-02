/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Python Data Matrix Structs
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: List matrices, tuples array buffers, and dictionary keys mapping
 */

export interface PythonDataFrame {
  columns: string[];
  rows: Array<Record<string, number | string>>;
}

export class PythonMathUtils {
  public static calculateMean(values: number[]): number {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / values.length;
  }
}
