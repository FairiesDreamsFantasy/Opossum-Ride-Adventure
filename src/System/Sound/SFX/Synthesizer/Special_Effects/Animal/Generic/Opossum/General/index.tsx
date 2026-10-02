/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generic Non-Character Opossum Sound Synthesizer
 * Offline Web Audio API procedural synthesis for generic (non-named) opossum chitters and clicks.
 */
export class GenericOpossumSynthesizer {
  public static playChitter(context: AudioContext, destination: AudioNode): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.linearRampToValueAtTime(1100, now + 0.06);
    osc.frequency.linearRampToValueAtTime(600, now + 0.12);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public static playSoftClick(context: AudioContext, destination: AudioNode): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }
}

export const globalGenericOpossumSFX = new GenericOpossumSynthesizer();
