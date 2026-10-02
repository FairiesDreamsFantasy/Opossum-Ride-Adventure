/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericGanderSynthesizer {
  public static playHonk(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    const baseFreq = 480 * pitchOffset;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.15, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.3);

    // Filter to capture the vocal nasal resonance
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(700, now + 0.3);
    filter.Q.setValueAtTime(3.5, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.22, now + 0.05);
    gainNode.gain.setValueAtTime(0.22, now + 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }
}
