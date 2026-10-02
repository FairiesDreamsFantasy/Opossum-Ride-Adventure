/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericCowSynthesizer {
  public static playMoo(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const baseFreq = 110 * pitchOffset;

    // Use triangle wave for a warm, hollow bovine quality
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.linearRampToValueAtTime(baseFreq * 1.15, now + 0.35);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.90, now + 1.2);

    // Use sawtooth wave for slight harmonic gravel
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(baseFreq * 1.01, now);
    osc2.frequency.linearRampToValueAtTime(baseFreq * 1.16, now + 0.35);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 0.89, now + 1.2);

    // Filter to mellow out the sawtooth sharpness
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + 1.2);
    filter.Q.setValueAtTime(3, now);

    // Envelope shaping
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.22, now + 0.25);
    gainNode.gain.setValueAtTime(0.22, now + 0.7);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.35);
    osc2.stop(now + 1.35);
  }
}
