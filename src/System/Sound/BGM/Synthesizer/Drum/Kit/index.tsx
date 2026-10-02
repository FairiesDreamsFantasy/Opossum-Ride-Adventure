/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const playBass = (ctx: AudioContext, dest: AudioNode, volume: number = 0.8, time?: number) => {
  const startTime = time ?? ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(65.41, startTime);
  osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.3);

  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(startTime);
  osc.stop(startTime + 0.4);
};
