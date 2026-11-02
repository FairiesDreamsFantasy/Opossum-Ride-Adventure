/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CharacterOwlSFX {
  public static playCharacterHoot(context: AudioContext, destination: AudioNode, pitchMultiplier: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(350 * pitchMultiplier, now);
    osc.frequency.exponentialRampToValueAtTime(380 * pitchMultiplier, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(320 * pitchMultiplier, now + 0.45);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.52);
  }
}

export const globalCharacterOwlSFX = new CharacterOwlSFX();
