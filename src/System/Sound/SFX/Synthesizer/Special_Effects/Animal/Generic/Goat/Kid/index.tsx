/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericKidSynthesizer {
  public static playKidBleat(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const carrier = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const LFO = context.createOscillator();
    const LFOGain = context.createGain();

    const baseFreq = 450 * pitchOffset;

    carrier.type = "sawtooth";
    carrier.frequency.setValueAtTime(baseFreq, now);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 1.08, now + 0.08);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 0.98, now + 0.4);

    LFO.frequency.setValueAtTime(16, now); // Very rapid goat baby bleat (16 Hz)
    LFOGain.gain.setValueAtTime(25, now);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, now);
    filter.Q.setValueAtTime(3.5, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.06);
    gainNode.gain.setValueAtTime(0.15, now + 0.28);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    LFO.connect(LFOGain);
    LFOGain.connect(carrier.frequency);

    carrier.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    carrier.start(now);
    LFO.start(now);

    carrier.stop(now + 0.55);
    LFO.stop(now + 0.55);
  }
}
