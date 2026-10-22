/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericRoosterSynthesizer {
  public static playCrow(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const baseFreq = 380 * pitchOffset;

    // A rooster crow (cock-a-doodle-doo) segmented pitch modulation
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.35, now + 0.25); // "cock-a"
    osc.frequency.setValueAtTime(baseFreq * 1.5, now + 0.3); // "doodle"
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.55, now + 0.7);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.9, now + 1.6); // "doo"

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 1.6);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.15); // Cock-a
    gainNode.gain.setValueAtTime(0.18, now + 0.3); // Doodle
    gainNode.gain.setValueAtTime(0.2, now + 0.7);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.7); // Doo

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    osc.start(now);
    osc.stop(now + 1.75);
  }
}
