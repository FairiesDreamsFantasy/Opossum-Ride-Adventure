/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericLambSynthesizer {
  public static playLambBleat(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const carrier = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const vibratoLFO = context.createOscillator();
    const vibratoGain = context.createGain();

    const baseFreq = 410 * pitchOffset;

    carrier.type = "sawtooth";
    carrier.frequency.setValueAtTime(baseFreq, now);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 1.1, now + 0.1);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 0.98, now + 0.5);

    vibratoLFO.frequency.setValueAtTime(13.5, now); // Rapid, tiny bleat (13.5 Hz)
    vibratoGain.gain.setValueAtTime(22, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, now);

    const tremoloNode = context.createGain();
    tremoloNode.gain.setValueAtTime(0.7, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gainNode.gain.setValueAtTime(0.18, now + 0.35);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    vibratoLFO.connect(vibratoGain);
    vibratoGain.connect(carrier.frequency);

    carrier.connect(filter);
    filter.connect(tremoloNode);
    tremoloNode.connect(gainNode);
    gainNode.connect(destination);

    carrier.start(now);
    vibratoLFO.start(now);

    carrier.stop(now + 0.6);
    vibratoLFO.stop(now + 0.6);
  }
}
