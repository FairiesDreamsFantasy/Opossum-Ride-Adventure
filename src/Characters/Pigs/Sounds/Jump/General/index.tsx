/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class PigJumpSound {
  public static playPigJump(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0) {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140 * pitchOffset, now);
    osc.frequency.exponentialRampToValueAtTime(260 * pitchOffset, now + 0.18);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}
