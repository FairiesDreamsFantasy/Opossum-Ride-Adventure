/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playFenceCollisionGeneral } from "./General";

/**
 * Procedural Fence Collision Sound
 * Wood splintering and impact clank.
 */
export const playFenceCollision = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  
  // High-precision FM Wooden Core Impact
  const carrier = context.createOscillator();
  const modulator = context.createOscillator();
  const modGain = context.createGain();
  const filter = context.createBiquadFilter();
  const masterGain = context.createGain();

  carrier.type = "sine";
  carrier.frequency.setValueAtTime(142.5, now);
  carrier.frequency.exponentialRampToValueAtTime(45.0, now + 0.22);

  modulator.type = "triangle";
  modulator.frequency.setValueAtTime(285.0, now);
  modulator.frequency.exponentialRampToValueAtTime(90.0, now + 0.22);

  modGain.gain.setValueAtTime(220.0, now);
  modGain.gain.exponentialRampToValueAtTime(10.0, now + 0.18);

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1800, now);
  filter.frequency.exponentialRampToValueAtTime(320, now + 0.24);
  filter.Q.setValueAtTime(3.5, now);

  masterGain.gain.setValueAtTime(0.28, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

  carrier.connect(filter);
  filter.connect(masterGain);
  masterGain.connect(destination);

  carrier.start(now);
  modulator.start(now);
  carrier.stop(now + 0.26);
  modulator.stop(now + 0.26);

  return { nodes: [carrier, modulator, modGain, filter, masterGain], endTime: now + 0.26 };
};
