/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericDrakeSynthesizer {
  public static playQuack(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const baseFreq = 260 * pitchOffset;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.9, now + 0.15);

    // Formant-like bandpass filter centered around 700 Hz
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(750, now);
    filter.frequency.exponentialRampToValueAtTime(550, now + 0.15);
    filter.Q.setValueAtTime(4.0, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}
