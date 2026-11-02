/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * C++ Sound Biquad Filter & DSP Node Simulator
 */

export class CPPSoundBiquadFilter {
  private x1 = 0; private x2 = 0;
  private y1 = 0; private y2 = 0;

  constructor(
    public b0: number = 1,
    public b1: number = 0,
    public b2: number = 0,
    public a1: number = 0,
    public a2: number = 0
  ) {}

  public processSample(x: number): number {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1;
    this.x1 = x;
    this.y2 = this.y1;
    this.y1 = y;
    return y;
  }
}

export default CPPSoundBiquadFilter;
