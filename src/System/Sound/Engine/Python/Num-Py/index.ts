/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NumPy Sound Vectorized Multi-Channel Array Operations
 */

export class NumPySoundArray {
  public data: Float32Array;

  constructor(public channels: number, public samples: number) {
    this.data = new Float32Array(channels * samples);
  }

  public getSample(channel: number, sampleIndex: number): number {
    return this.data[channel * this.samples + sampleIndex];
  }

  public setSample(channel: number, sampleIndex: number, value: number): void {
    this.data[channel * this.samples + sampleIndex] = value;
  }
}

export default NumPySoundArray;
