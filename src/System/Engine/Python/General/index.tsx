/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - NumPy-Style Vector Operations & Linear Slopes
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Scientific Python Multidimensional Array & Slicing emulations
 */

export class NumPyArray {
  public data: Float64Array;
  public shape: [number, number];

  constructor(data: number[] | Float64Array, shape: [number, number]) {
    this.data = data instanceof Float64Array ? data : new Float64Array(data);
    this.shape = shape;
    if (this.data.length !== shape[0] * shape[1]) {
      throw new Error(`[NumPy Array] Shape mismatch: size ${this.data.length} does not match shape ${shape[0]}x${shape[1]}`);
    }
  }

  /**
   * Emulates Python's array slice syntax: array[row_start:row_end, col_start:col_end]
   */
  public slice(rStart: number, rEnd: number, cStart: number, cEnd: number): NumPyArray {
    const rows = rEnd - rStart;
    const cols = cEnd - cStart;
    const slicedData = new Float64Array(rows * cols);
    let targetIdx = 0;

    for (let r = rStart; r < rEnd; r++) {
      for (let c = cStart; c < cEnd; c++) {
        const sourceIdx = (r * this.shape[1]) + c;
        slicedData[targetIdx++] = this.data[sourceIdx];
      }
    }
    return new NumPyArray(slicedData, [rows, cols]);
  }

  /**
   * Emulates NumPy matrix multiplication: np.dot(A, B)
   */
  public static dot(a: NumPyArray, b: NumPyArray): NumPyArray {
    if (a.shape[1] !== b.shape[0]) {
      throw new Error(`[NumPy dot] Dimension mismatch: matrices cannot be multiplied: ${a.shape[1]} vs ${b.shape[0]}`);
    }
    const rows = a.shape[0];
    const cols = b.shape[1];
    const commonDim = a.shape[1];
    const resultData = new Float64Array(rows * cols);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let sum = 0;
        for (let k = 0; k < commonDim; k++) {
          const aVal = a.data[(r * a.shape[1]) + k];
          const bVal = b.data[(k * b.shape[1]) + c];
          sum += aVal * bVal;
        }
        resultData[(r * cols) + c] = sum;
      }
    }
    return new NumPyArray(resultData, [rows, cols]);
  }

  public transpose(): NumPyArray {
    const rows = this.shape[0];
    const cols = this.shape[1];
    const transposedData = new Float64Array(rows * cols);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        transposedData[(c * rows) + r] = this.data[(r * cols) + c];
      }
    }
    return new NumPyArray(transposedData, [cols, rows]);
  }
}

/**
 * Scientific linear interpolation (analogous to numpy.interp)
 */
export function numpyInterp(x: number, xp: number[], fp: number[]): number {
  if (xp.length !== fp.length || xp.length === 0) {
    throw new Error("[numpy.interp] X-points and Y-points arrays must be matching in size");
  }
  if (x <= xp[0]) return fp[0];
  if (x >= xp[xp.length - 1]) return fp[fp.length - 1];

  // Binary search for interval
  let low = 0;
  let high = xp.length - 1;
  while (high - low > 1) {
    const mid = Math.floor((low + high) / 2);
    if (xp[mid] > x) {
      high = mid;
    } else {
      low = mid;
    }
  }

  const t = (x - xp[low]) / (xp[high] - xp[low]);
  return fp[low] + t * (fp[high] - fp[low]);
}
