/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generic Owl Sound Synthesizer
 * Offline Web Audio API procedural synthesis for generic (non-character) owl hoots and calls.
 */
export class GenericOwlSynthesizer {
  public static playHoot(context: AudioContext, destination: AudioNode, baseFreq: number = 320): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.08, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.92, now + 0.45);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.52);
  }

  public static playDoubleHoot(context: AudioContext, destination: AudioNode): void {
    this.playHoot(context, destination, 340);
    setTimeout(() => {
      this.playHoot(context, destination, 310);
    }, 280);
  }
}

export const globalGenericOwlSFX = new GenericOwlSynthesizer();
