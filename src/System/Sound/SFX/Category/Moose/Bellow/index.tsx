/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playMooseBellow } from "./General";

export * from "./General";
export { playMooseBellow } from "./General";

export const playBellowSFX = (context: AudioContext, destination: AudioNode) => {
  return playMooseBellow(context, destination, context.currentTime);
};

/**
 * Procedural Deep Bull Bellow:
 * Low fundamental frequency (75-50Hz) with heavy chest sub-resonance and slow LFO roar flutter.
 */
export const playDeepBullBellow = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { pitchMultiplier?: number; volume?: number; duration?: number } = {}
) => {
  const now = startTime;
  const mult = options.pitchMultiplier ?? 0.88;
  const duration = options.duration ?? 1.35;
  const volume = options.volume ?? 0.65;

  const osc1 = context.createOscillator();
  const osc2 = context.createOscillator();
  const subOsc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(380 * mult, now);
  filter.frequency.exponentialRampToValueAtTime(100 * mult, now + duration);
  filter.Q.setValueAtTime(5.5, now);

  osc1.type = "sawtooth";
  osc1.frequency.setValueAtTime(75 * mult, now);
  osc1.frequency.linearRampToValueAtTime(50 * mult, now + duration);

  osc2.type = "sawtooth";
  osc2.frequency.setValueAtTime(71 * mult, now);
  osc2.frequency.linearRampToValueAtTime(47 * mult, now + duration);

  subOsc.type = "sine";
  subOsc.frequency.setValueAtTime(37.5 * mult, now);
  subOsc.frequency.linearRampToValueAtTime(25 * mult, now + duration);

  // Tremor LFO
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.frequency);
  lfoGain.connect(osc2.frequency);
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(11, now);
  lfoGain.gain.setValueAtTime(4.5, now);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  subOsc.connect(gain);
  gain.connect(destination);

  lfo.start(now);
  osc1.start(now);
  osc2.start(now);
  subOsc.start(now);

  const endTime = now + duration;
  lfo.stop(endTime + 0.1);
  osc1.stop(endTime + 0.1);
  osc2.stop(endTime + 0.1);
  subOsc.stop(endTime + 0.1);

  return { nodes: [osc1, osc2, subOsc, filter, gain, lfo, lfoGain], endTime };
};

/**
 * Procedural Cow Moose Mating Call:
 * Higher fundamental frequency (115-80Hz) with resonant vocal tract filter sweep.
 */
export const playCowMatingCall = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { pitchMultiplier?: number; volume?: number; duration?: number } = {}
) => {
  const now = startTime;
  const mult = options.pitchMultiplier ?? 1.15;
  const duration = options.duration ?? 1.05;
  const volume = options.volume ?? 0.55;

  const osc1 = context.createOscillator();
  const osc2 = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(520 * mult, now);
  filter.frequency.exponentialRampToValueAtTime(190 * mult, now + duration);
  filter.Q.setValueAtTime(3.8, now);

  osc1.type = "sawtooth";
  osc1.frequency.setValueAtTime(115 * mult, now);
  osc1.frequency.linearRampToValueAtTime(80 * mult, now + duration);

  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(110 * mult, now);
  osc2.frequency.linearRampToValueAtTime(76 * mult, now + duration);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  osc1.start(now);
  osc2.start(now);
  const endTime = now + duration;
  osc1.stop(endTime);
  osc2.stop(endTime);

  return { nodes: [osc1, osc2, filter, gain], endTime };
};
