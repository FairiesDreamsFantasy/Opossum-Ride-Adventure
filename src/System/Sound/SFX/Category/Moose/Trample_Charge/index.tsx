/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MooseTrampleChargeGeneral } from "./General";

export * from "./General";

/**
 * Procedural Moose Charge Trample:
 * Synthesizes heavy triangle impact thud, sliding hoof clatter, and ground debris displacement.
 */
export const playMooseChargeTrample = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { volume?: number } = {}
) => {
  const now = startTime;
  const volume = options.volume ?? 0.55;
  const duration = MooseTrampleChargeGeneral.defaults.duration;

  // 1. Low-frequency Triangle Thud (Animal momentum)
  const thudOsc = context.createOscillator();
  const thudGain = context.createGain();
  thudOsc.type = "triangle";
  thudOsc.frequency.setValueAtTime(140, now);
  thudOsc.frequency.exponentialRampToValueAtTime(15, now + 0.35);

  thudGain.gain.setValueAtTime(volume * 0.8, now);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

  thudOsc.connect(thudGain);
  thudGain.connect(destination);
  thudOsc.start(now);
  thudOsc.stop(now + 0.45);

  // 2. Sliding Cloven Hoof Clatter
  const hoofOsc = context.createOscillator();
  const hoofGain = context.createGain();
  hoofOsc.type = "square";
  hoofOsc.frequency.setValueAtTime(220, now);
  hoofOsc.frequency.linearRampToValueAtTime(60, now + 0.3);

  hoofGain.gain.setValueAtTime(volume * 0.32, now);
  hoofGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

  hoofOsc.connect(hoofGain);
  hoofGain.connect(destination);
  hoofOsc.start(now);
  hoofOsc.stop(now + 0.35);

  // 3. Ground Coupling Sub Rumble
  const subOsc = context.createOscillator();
  const subGain = context.createGain();
  subOsc.type = "sine";
  subOsc.frequency.setValueAtTime(55, now);
  subOsc.frequency.linearRampToValueAtTime(20, now + duration);

  subGain.gain.setValueAtTime(volume * 0.6, now);
  subGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  subOsc.connect(subGain);
  subGain.connect(destination);
  subOsc.start(now);
  subOsc.stop(now + duration);

  return { nodes: [thudOsc, thudGain, hoofOsc, hoofGain, subOsc, subGain], endTime: now + duration };
};
