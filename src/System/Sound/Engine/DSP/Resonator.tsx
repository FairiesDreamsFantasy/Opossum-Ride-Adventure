/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Advanced DSP Resonator using Biquad Filter equations.
 */
export class BiquadResonator {
  private filter: BiquadFilterNode;

  constructor(private ctx: AudioContext, type: BiquadFilterType = "lowpass") {
    this.filter = ctx.createBiquadFilter();
    this.filter.type = type;
  }

  public setParameters(frequency: number, Q: number) {
    this.filter.frequency.setValueAtTime(frequency, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(Q, this.ctx.currentTime);
  }

  public connect(source: AudioNode, destination: AudioNode) {
    source.connect(this.filter);
    this.filter.connect(destination);
  }
}
