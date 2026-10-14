/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MooseJumpGeneral } from "./General";

export * from "./General";

/**
 * Procedural Moose Jump Synthesis:
 * Combines heavy leg muscle tension release with deep aerodynamic air displacement.
 */
export const playMooseJump = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { pitch?: number; volume?: number; type?: "Bull" | "Cow" } = {}
) => {
  const now = startTime;
  const isBull = options.type !== "Cow";
  const mult = (options.pitch ?? 1.0) * (isBull ? 0.9 : 1.1);
  const volume = options.volume ?? 0.42;
  const duration = MooseJumpGeneral.defaults.duration;

  // 1. Heavy Low-Frequency Muscle Propulsion Swoop
  const swooshOsc = context.createOscillator();
  const swooshGain = context.createGain();
  const swooshFilter = context.createBiquadFilter();

  swooshFilter.type = "lowpass";
  swooshFilter.frequency.setValueAtTime(260 * mult, now);
  swooshFilter.frequency.exponentialRampToValueAtTime(80 * mult, now + duration);

  swooshOsc.type = "sawtooth";
  swooshOsc.frequency.setValueAtTime(75 * mult, now);
  swooshOsc.frequency.exponentialRampToValueAtTime(210 * mult, now + duration * 0.4);
  swooshOsc.frequency.exponentialRampToValueAtTime(50 * mult, now + duration);

  swooshGain.gain.setValueAtTime(0.001, now);
  swooshGain.gain.linearRampToValueAtTime(volume * 0.8, now + duration * 0.2);
  swooshGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  swooshOsc.connect(swooshFilter);
  swooshFilter.connect(swooshGain);
  swooshGain.connect(destination);

  // 2. Deep Sub-Bass Launch Rumble
  const subOsc = context.createOscillator();
  const subGain = context.createGain();

  subOsc.type = "sine";
  subOsc.frequency.setValueAtTime(45 * mult, now);
  subOsc.frequency.exponentialRampToValueAtTime(20 * mult, now + 0.3);

  subGain.gain.setValueAtTime(volume * 0.6, now);
  subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

  subOsc.connect(subGain);
  subGain.connect(destination);

  swooshOsc.start(now);
  subOsc.start(now);

  const endTime = now + duration;
  swooshOsc.stop(endTime);
  subOsc.stop(now + 0.35);

  return { nodes: [swooshOsc, swooshFilter, swooshGain, subOsc, subGain], endTime };
};
