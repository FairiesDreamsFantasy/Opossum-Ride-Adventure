/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playRockCollisionGeneral } from "./General";

/**
 * Procedural Rock Collision Sound
 * Low dull heavy impact thud.
 */
export const playRockCollision = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  
  // High-precision Lithic Rock Impact FM Core
  const carrier = context.createOscillator();
  const modulator = context.createOscillator();
  const modGain = context.createGain();
  const lowpass = context.createBiquadFilter();
  const masterGain = context.createGain();

  carrier.type = "sine";
  carrier.frequency.setValueAtTime(95.0, now);
  carrier.frequency.exponentialRampToValueAtTime(22.0, now + 0.40);

  modulator.type = "triangle";
  modulator.frequency.setValueAtTime(190.0, now);
  modulator.frequency.exponentialRampToValueAtTime(44.0, now + 0.40);

  modGain.gain.setValueAtTime(320.0, now);
  modGain.gain.exponentialRampToValueAtTime(15.0, now + 0.32);

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);

  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(650, now);
  lowpass.frequency.exponentialRampToValueAtTime(120, now + 0.42);
  lowpass.Q.setValueAtTime(4.0, now);

  masterGain.gain.setValueAtTime(0.38, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

  carrier.connect(lowpass);
  lowpass.connect(masterGain);
  masterGain.connect(destination);

  carrier.start(now);
  modulator.start(now);
  carrier.stop(now + 0.46);
  modulator.stop(now + 0.46);

  return { nodes: [carrier, modulator, modGain, lowpass, masterGain], endTime: now + 0.46 };
};
