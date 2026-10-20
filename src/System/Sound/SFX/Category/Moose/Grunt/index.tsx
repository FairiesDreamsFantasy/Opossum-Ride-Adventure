/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playMooseGrunt } from "./General";

export * from "./General";
export { playMooseGrunt } from "./General";

export const playGruntSFX = (context: AudioContext, destination: AudioNode) => {
  return playMooseGrunt(context, destination, context.currentTime);
};

/**
 * Procedural Throat Puff Grunt:
 * Short, high-pressure vocal puff (120-60Hz) with rapid raspy harmonic decay.
 */
export const playThroatPuffGrunt = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { pitchMultiplier?: number; volume?: number } = {}
) => {
  const now = startTime;
  const mult = options.pitchMultiplier ?? 1.0;
  const volume = options.volume ?? 0.45;
  const duration = 0.22;

  const osc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(280 * mult, now);
  filter.frequency.exponentialRampToValueAtTime(75 * mult, now + duration);

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(115 * mult, now);
  osc.frequency.exponentialRampToValueAtTime(55 * mult, now + duration);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  osc.start(now);
  osc.stop(now + duration);

  return { nodes: [osc, filter, gain], endTime: now + duration };
};

/**
 * Procedural Cautionary Double Grunt:
 * Two rapid rhythmic vocal pulses communicating caution to the herd.
 */
export const playCautionaryDoubleGrunt = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { pitchMultiplier?: number; volume?: number } = {}
) => {
  const now = startTime;
  const res1 = playThroatPuffGrunt(context, destination, now, options);
  const res2 = playThroatPuffGrunt(context, destination, now + 0.18, {
    ...options,
    pitchMultiplier: (options.pitchMultiplier ?? 1.0) * 0.92,
    volume: (options.volume ?? 0.45) * 0.85
  });

  return { endTime: res2.endTime };
};
