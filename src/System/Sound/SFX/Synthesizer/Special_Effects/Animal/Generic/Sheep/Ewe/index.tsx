/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericEweSynthesizer {
  public static playBleat(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const carrier = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    // LFO for vibrato (frequency modulation)
    const vibratoLFO = context.createOscillator();
    const vibratoGain = context.createGain();

    const baseFreq = 220 * pitchOffset;

    carrier.type = "sawtooth";
    carrier.frequency.setValueAtTime(baseFreq, now);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 1.05, now + 0.1);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 0.95, now + 0.65);

    // Set up LFO for rapid sheep vibration (11 Hz)
    vibratoLFO.frequency.setValueAtTime(11, now);
    vibratoGain.gain.setValueAtTime(15, now); // Modulate by up to 15 Hz

    // Filter to sweeten the sawtooth
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, now);

    // Tremolo (volume modulation) via LFO is created by connecting vibratoLFO to another gain node
    const tremoloNode = context.createGain();
    tremoloNode.gain.setValueAtTime(0.7, now);

    // Envelope shaping
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.08);
    gainNode.gain.setValueAtTime(0.2, now + 0.45);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    // Hook up LFO to carrier frequency
    vibratoLFO.connect(vibratoGain);
    vibratoGain.connect(carrier.frequency);

    // Connect everything
    carrier.connect(filter);
    filter.connect(tremoloNode);
    tremoloNode.connect(gainNode);
    gainNode.connect(destination);

    // Start everything
    carrier.start(now);
    vibratoLFO.start(now);

    carrier.stop(now + 0.75);
    vibratoLFO.stop(now + 0.75);
  }
}
