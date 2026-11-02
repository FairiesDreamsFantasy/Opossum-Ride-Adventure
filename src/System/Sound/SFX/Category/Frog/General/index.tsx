/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CharacterFrogSFX {
  public static playCharacterCroak(context: AudioContext, destination: AudioNode, pitchMultiplier: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(160 * pitchMultiplier, now);
    osc.frequency.linearRampToValueAtTime(120 * pitchMultiplier, now + 0.3);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }
}

export const globalCharacterFrogSFX = new CharacterFrogSFX();
