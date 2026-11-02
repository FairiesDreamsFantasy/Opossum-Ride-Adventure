/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Cave Water Drip Submodule
 */

export class CaveWaterDrip {
  public static play(context: AudioContext, destination: AudioNode): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1400 + Math.random() * 300, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}
