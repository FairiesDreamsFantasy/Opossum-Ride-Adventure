/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MooseSmashGeneral } from "./General";

export * from "./General";

/**
 * Procedural Moose Smash Vocalization & Impact:
 * Synthesizes a massive low-frequency impact coupled with a surprised/disoriented guttural vocal grunt.
 */
export const playMooseSmash = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { name?: string; type?: "Bull" | "Cow"; volume?: number } = {}
) => {
  const now = startTime;
  const mooseType = options.type ?? "Bull";
  const volume = options.volume ?? 0.55;
  const duration = MooseSmashGeneral.defaults.duration;

  // 1. Heavy Impact Low Thud
  const thudOsc = context.createOscillator();
  const thudGain = context.createGain();

  thudOsc.type = "triangle";
  const startF = mooseType === "Bull" ? 110 : 135;
  thudOsc.frequency.setValueAtTime(startF, now);
  thudOsc.frequency.exponentialRampToValueAtTime(20, now + 0.35);

  thudGain.gain.setValueAtTime(volume * 0.8, now);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

  thudOsc.connect(thudGain);
  thudGain.connect(destination);

  // 2. Disoriented Guttural Vocal Yelp (The moose reacting to impact)
  const vocalOsc = context.createOscillator();
  const vocalFilter = context.createBiquadFilter();
  const vocalGain = context.createGain();

  vocalFilter.type = "lowpass";
  vocalFilter.frequency.setValueAtTime(mooseType === "Bull" ? 350 : 450, now + 0.05);
  vocalFilter.frequency.exponentialRampToValueAtTime(90, now + duration);

  vocalOsc.type = "sawtooth";
  const vStart = mooseType === "Bull" ? 140 : 180;
  vocalOsc.frequency.setValueAtTime(vStart, now + 0.05);
  vocalOsc.frequency.linearRampToValueAtTime(vStart * 1.3, now + 0.18);
  vocalOsc.frequency.exponentialRampToValueAtTime(45, now + duration);

  vocalGain.gain.setValueAtTime(0.001, now);
  vocalGain.gain.setValueAtTime(0.001, now + 0.05);
  vocalGain.gain.linearRampToValueAtTime(volume * 0.7, now + 0.12);
  vocalGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  vocalOsc.connect(vocalFilter);
  vocalFilter.connect(vocalGain);
  vocalGain.connect(destination);

  thudOsc.start(now);
  vocalOsc.start(now + 0.05);

  const endTime = now + duration;
  thudOsc.stop(now + 0.42);
  vocalOsc.stop(endTime);

  return { nodes: [thudOsc, thudGain, vocalOsc, vocalFilter, vocalGain], endTime };
};
