/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NumPy Input Trajectory Vector Array Simulator
 */

export class NumPyInputTrajectory {
  private coords: Float32Array;

  constructor(public maxPoints: number = 64) {
    this.coords = new Float32Array(maxPoints * 2);
  }

  public recordPoint(index: number, x: number, y: number): void {
    const idx = (index % this.maxPoints) * 2;
    this.coords[idx] = x;
    this.coords[idx + 1] = y;
  }
}

export default NumPyInputTrajectory;
