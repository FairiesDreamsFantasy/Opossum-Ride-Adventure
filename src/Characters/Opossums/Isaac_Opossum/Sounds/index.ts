/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function playIsaacOpossumBark(ctx: AudioContext, isRetro: boolean, dest: AudioNode): void {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = isRetro ? "square" : "sawtooth";
  osc.frequency.setValueAtTime(250, now);
  osc.frequency.exponentialRampToValueAtTime(135, now + 0.18);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(now);
  osc.stop(now + 0.2);
}

export const IsaacOpossumSounds = {
  playBark: playIsaacOpossumBark
};
