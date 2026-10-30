/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericCalfSynthesizer {
  public static playCalfCall(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const baseFreq = 210 * pitchOffset;

    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.linearRampToValueAtTime(baseFreq * 1.2, now + 0.25);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.95, now + 0.8);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(baseFreq * 1.02, now);
    osc2.frequency.linearRampToValueAtTime(baseFreq * 1.22, now + 0.25);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 0.96, now + 0.8);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + 0.8);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gainNode.gain.setValueAtTime(0.2, now + 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.9);
    osc2.stop(now + 0.9);
  }
}
