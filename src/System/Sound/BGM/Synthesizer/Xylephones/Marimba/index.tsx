/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const playMarimba = (ctx: AudioContext, dest: AudioNode, frequency: number, volume: number = 0.4, time?: number) => {
  const startTime = time ?? ctx.currentTime;
  const duration = 1.5;

  // Main tone
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(frequency, startTime);
  gain1.gain.setValueAtTime(volume, startTime);
  gain1.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  // High harmonic
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(frequency * 3.9, startTime);
  gain2.gain.setValueAtTime(volume * 0.3, startTime);
  gain2.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

  // Sub-harmonic attack
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = 'triangle';
  osc3.frequency.setValueAtTime(frequency * 0.5, startTime);
  gain3.gain.setValueAtTime(volume * 0.5, startTime);
  gain3.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);

  osc1.connect(gain1);
  osc2.connect(gain2);
  osc3.connect(gain3);

  gain1.connect(dest);
  gain2.connect(dest);
  gain3.connect(dest);

  osc1.start(startTime);
  osc2.start(startTime);
  osc3.start(startTime);

  osc1.stop(startTime + duration);
  osc2.stop(startTime + duration);
  osc3.stop(startTime + duration);
};
