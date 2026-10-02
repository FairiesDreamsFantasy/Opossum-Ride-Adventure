/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const playDeepBass = (ctx: AudioContext, dest: AudioNode, frequency: number, volume: number = 0.6, time?: number) => {
  const startTime = time ?? ctx.currentTime;
  const duration = 2;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(frequency, startTime);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(300, startTime);
  filter.frequency.exponentialRampToValueAtTime(100, startTime + 0.5);

  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(dest);

  osc.start(startTime);
  osc.stop(startTime + duration);
};
