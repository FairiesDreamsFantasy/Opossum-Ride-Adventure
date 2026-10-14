/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericDucklingSynthesizer {
  public static playSqueak(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const baseFreq = 1150 * pitchOffset;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.95, now + 0.12);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1600, now);
    filter.Q.setValueAtTime(3.0, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }
}
