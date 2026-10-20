/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericBullSynthesizer {
  public static playGrunt(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const baseFreq = 65 * pitchOffset;

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.linearRampToValueAtTime(baseFreq * 1.05, now + 0.2);
    osc1.frequency.linearRampToValueAtTime(baseFreq * 0.85, now + 1.0);

    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(baseFreq * 0.99, now);
    osc2.frequency.linearRampToValueAtTime(baseFreq * 1.04, now + 0.2);
    osc2.frequency.linearRampToValueAtTime(baseFreq * 0.84, now + 1.0);

    // Deep lowpass to keep it rumbly and intimidating
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(180, now);
    filter.frequency.exponentialRampToValueAtTime(140, now + 1.0);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.15);
    gainNode.gain.setValueAtTime(0.3, now + 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.15);
    osc2.stop(now + 1.15);
  }
}
