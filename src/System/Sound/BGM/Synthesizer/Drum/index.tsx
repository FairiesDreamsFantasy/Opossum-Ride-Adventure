/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const playSlap = (ctx: AudioContext, dest: AudioNode, volume: number = 0.5, time?: number) => {
  const startTime = time ?? ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(400, startTime);
  osc.frequency.exponentialRampToValueAtTime(150, startTime + 0.08);

  filter.type = 'highpass';
  filter.frequency.setValueAtTime(1000, startTime);

  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(dest);

  osc.start(startTime);
  osc.stop(startTime + 0.1);
};

export const playTone = (ctx: AudioContext, dest: AudioNode, volume: number = 0.6, time?: number) => {
  const startTime = time ?? ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(200, startTime);
  osc.frequency.exponentialRampToValueAtTime(100, startTime + 0.15);

  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(startTime);
  osc.stop(startTime + 0.2);
};
