/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Precision Harmonic Oscillator for procedural sound synthesis.
 */
export class HarmonicOscillator {
  private osc: OscillatorNode;
  private gain: GainNode;

  constructor(private ctx: AudioContext) {
    this.osc = ctx.createOscillator();
    this.gain = ctx.createGain();
    this.osc.connect(this.gain);
  }

  public setParameters(type: OscillatorType, frequency: number, volume: number) {
    this.osc.type = type;
    this.osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
    this.gain.gain.setValueAtTime(volume, this.ctx.currentTime);
  }

  public connect(destination: AudioNode) {
    this.gain.connect(destination);
  }

  public start(time: number) { this.osc.start(time); }
  public stop(time: number) { this.osc.stop(time); }
}
