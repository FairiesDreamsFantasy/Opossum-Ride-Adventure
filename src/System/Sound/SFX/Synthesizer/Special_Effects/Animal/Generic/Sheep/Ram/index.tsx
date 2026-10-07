/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericRamSynthesizer {
  public static playRamBleat(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const carrier = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const vibratoLFO = context.createOscillator();
    const vibratoGain = context.createGain();

    const baseFreq = 150 * pitchOffset;

    carrier.type = "sawtooth";
    carrier.frequency.setValueAtTime(baseFreq, now);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 1.08, now + 0.15);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 0.92, now + 0.7);

    vibratoLFO.frequency.setValueAtTime(9.5, now); // Slower, deeper bleat (9.5 Hz)
    vibratoGain.gain.setValueAtTime(12, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, now);

    const tremoloNode = context.createGain();
    tremoloNode.gain.setValueAtTime(0.65, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.1);
    gainNode.gain.setValueAtTime(0.25, now + 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    vibratoLFO.connect(vibratoGain);
    vibratoGain.connect(carrier.frequency);

    carrier.connect(filter);
    filter.connect(tremoloNode);
    tremoloNode.connect(gainNode);
    gainNode.connect(destination);

    carrier.start(now);
    vibratoLFO.start(now);

    carrier.stop(now + 0.85);
    vibratoLFO.stop(now + 0.85);
  }
}
