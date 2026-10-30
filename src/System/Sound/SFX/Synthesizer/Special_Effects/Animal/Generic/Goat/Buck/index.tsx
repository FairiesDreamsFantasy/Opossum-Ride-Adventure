/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericBuckSynthesizer {
  public static playBuckBleat(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const carrier = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const LFO = context.createOscillator();
    const LFOGain = context.createGain();

    const baseFreq = 185 * pitchOffset;

    carrier.type = "sawtooth";
    carrier.frequency.setValueAtTime(baseFreq, now);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 1.06, now + 0.1);
    carrier.frequency.linearRampToValueAtTime(baseFreq * 0.94, now + 0.55);

    LFO.frequency.setValueAtTime(14.5, now); // Fast goat bleat rate (14.5 Hz)
    LFOGain.gain.setValueAtTime(18, now); // Strong pitch vibrato

    // High Q lowpass or bandpass to give it a nasal, buzzy characteristic
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(4.5, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gainNode.gain.setValueAtTime(0.18, now + 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    LFO.connect(LFOGain);
    LFOGain.connect(carrier.frequency);

    carrier.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    carrier.start(now);
    LFO.start(now);

    carrier.stop(now + 0.7);
    LFO.stop(now + 0.7);
  }
}
