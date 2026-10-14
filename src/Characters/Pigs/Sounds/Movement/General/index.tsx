/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class PigTrotMovementSound {
  public static playHoofTrot(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0) {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(110 * pitchOffset, now);
    osc.frequency.exponentialRampToValueAtTime(55 * pitchOffset, now + 0.06);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }
}
