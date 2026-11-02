/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericDoeSynthesizer {
  public static playDoeBleat(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const carrier = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const LFO = context.createOscillator();
    const LFOGain = context.createGain();

    const baseFreq = 270 * pitchOffset;

    carrier.type = "sawtooth";
    carrier.frequency.setValueAtTime(baseFreq, now);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 1.05, now + 0.1);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 0.95, now + 0.5);

    LFO.frequency.setValueAtTime(15, now); // Goat bleat frequency (15 Hz)
    LFOGain.gain.setValueAtTime(20, now);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, now);
    filter.Q.setValueAtTime(4.0, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.16, now + 0.08);
    gainNode.gain.setValueAtTime(0.16, now + 0.35);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    LFO.connect(LFOGain);
    LFOGain.connect(carrier.frequency);

    carrier.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    carrier.start(now);
    LFO.start(now);

    carrier.stop(now + 0.65);
    LFO.stop(now + 0.65);
  }
}
