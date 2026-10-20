/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericPigletSynthesizer {
  public static playPigletOink(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(780 * pitchOffset, now);
    osc.frequency.exponentialRampToValueAtTime(520 * pitchOffset, now + 0.16);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }
}
