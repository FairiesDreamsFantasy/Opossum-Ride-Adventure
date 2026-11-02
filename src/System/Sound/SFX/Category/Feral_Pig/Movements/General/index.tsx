/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class FeralPigMovementSound {
  public static playTrot(context: AudioContext, destination: AudioNode, pitch: number = 1.0) {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(40 * pitch, now + 0.05);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(280, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }
}
