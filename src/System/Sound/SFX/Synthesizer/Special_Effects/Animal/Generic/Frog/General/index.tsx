/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generic Frog Sound Synthesizer
 * Offline Web Audio API procedural synthesis for generic (non-character) frog croaks and ribbits.
 */
export class GenericFrogSynthesizer {
  public static playCroak(context: AudioContext, destination: AudioNode, baseFreq: number = 110): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.75, now + 0.28);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  public static playRibbit(context: AudioContext, destination: AudioNode): void {
    const now = context.currentTime;
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const gain = context.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    osc1.frequency.setValueAtTime(180, now);
    osc1.frequency.exponentialRampToValueAtTime(320, now + 0.12);
    osc1.frequency.exponentialRampToValueAtTime(140, now + 0.25);

    osc2.frequency.setValueAtTime(360, now);
    osc2.frequency.exponentialRampToValueAtTime(640, now + 0.12);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.3);
    osc2.stop(now + 0.3);
  }
}

export const globalGenericFrogSFX = new GenericFrogSynthesizer();
