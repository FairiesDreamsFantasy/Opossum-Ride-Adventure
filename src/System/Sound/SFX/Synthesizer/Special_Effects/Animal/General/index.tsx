/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Animal Special Effects General Submodule
 * Procedural synthesis for assorted non-opossum animal sounds (birds, frogs, insects, nocturnal fauna).
 */

export class AnimalSpecialEffectsEngine {
  public static playBirdChirp(context: AudioContext, destination: AudioNode): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(2500, now);
    osc.frequency.exponentialRampToValueAtTime(3800, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(3000, now + 0.15);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  public static playFrogCroak(context: AudioContext, destination: AudioNode): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }
}

export const globalAnimalSFX = new AnimalSpecialEffectsEngine();
