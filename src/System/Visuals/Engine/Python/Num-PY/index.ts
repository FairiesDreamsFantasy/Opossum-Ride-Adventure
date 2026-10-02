/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NumPy Vectorized Array Operations Simulator
 */

export class NumPyNDArray {
  private buffer: Float64Array;
  public readonly shape: [number, number];

  constructor(rows: number, cols: number, initialValues?: number[]) {
    this.shape = [rows, cols];
    this.buffer = new Float64Array(rows * cols);
    if (initialValues) {
      this.buffer.set(initialValues.slice(0, rows * cols));
    }
  }

  public get(r: number, c: number): number {
    return this.buffer[r * this.shape[1] + c];
  }

  public set(r: number, c: number, val: number): void {
    this.buffer[r * this.shape[1] + c] = val;
  }

  public multiplyScalar(scalar: number): NumPyNDArray {
    const result = new NumPyNDArray(this.shape[0], this.shape[1]);
    for (let i = 0; i < this.buffer.length; i++) {
      result.buffer[i] = this.buffer[i] * scalar;
    }
    return result;
  }
}

export default NumPyNDArray;
