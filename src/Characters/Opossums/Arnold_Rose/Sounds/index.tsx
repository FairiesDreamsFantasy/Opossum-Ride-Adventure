/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function playArnoldRoseBark(ctx: AudioContext, _isRetro: boolean = false, dest?: AudioNode) {
  const output = dest || ctx.destination;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(280, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(output);

  osc.start(now);
  osc.stop(now + 0.12);
}

export const ArnoldRoseSounds = {
  playChatter: playArnoldRoseBark
};

export default ArnoldRoseSounds;
