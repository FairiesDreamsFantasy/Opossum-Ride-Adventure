/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playMooseSnort } from "./General";

export * from "./General";
export { playMooseSnort } from "./General";

export const playSnortSFX = (context: AudioContext, destination: AudioNode) => {
  return playMooseSnort(context, destination, context.currentTime);
};

/**
 * Procedural Aggressive Charge Huff:
 * Fast, pressurized nasal burst when the moose prepares to charge.
 */
export const playAggressiveChargeHuff = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { pitchMultiplier?: number; volume?: number } = {}
) => {
  const now = startTime;
  const mult = options.pitchMultiplier ?? 1.0;
  const volume = options.volume ?? 0.42;
  const duration = 0.28;

  const osc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(420 * mult, now);
  filter.frequency.exponentialRampToValueAtTime(140 * mult, now + duration);
  filter.Q.setValueAtTime(3.2, now);

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(130 * mult, now);
  osc.frequency.linearRampToValueAtTime(70 * mult, now + duration);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  osc.start(now);
  osc.stop(now + duration);

  return { nodes: [osc, filter, gain], endTime: now + duration };
};

/**
 * Procedural Alert Puff:
 * Brief exploratory nasal puff.
 */
export const playAlertPuff = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { pitchMultiplier?: number; volume?: number } = {}
) => {
  const now = startTime;
  const mult = options.pitchMultiplier ?? 1.0;
  const volume = options.volume ?? 0.35;
  const duration = 0.18;

  const osc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  filter.type = "highpass";
  filter.frequency.setValueAtTime(220 * mult, now);

  osc.type = "triangle";
  osc.frequency.setValueAtTime(160 * mult, now);
  osc.frequency.exponentialRampToValueAtTime(80 * mult, now + duration);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  osc.start(now);
  osc.stop(now + duration);

  return { nodes: [osc, filter, gain], endTime: now + duration };
};
