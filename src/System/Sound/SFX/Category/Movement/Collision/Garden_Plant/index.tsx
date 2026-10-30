/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playGardenPlantCollisionGeneral } from "./General";

/**
 * Procedural Garden Plant Collision Sound
 * Soft leaves rustling and brushing thud.
 */
export const playGardenPlantCollision = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  
  // High-precision Botanical Foliage Impact & Leaf Resonance
  const carrier = context.createOscillator();
  const modulator = context.createOscillator();
  const modGain = context.createGain();
  const bandpass = context.createBiquadFilter();
  const masterGain = context.createGain();

  carrier.type = "sine";
  carrier.frequency.setValueAtTime(280, now);
  carrier.frequency.exponentialRampToValueAtTime(85, now + 0.16);

  modulator.type = "sine";
  modulator.frequency.setValueAtTime(560, now);
  modulator.frequency.exponentialRampToValueAtTime(170, now + 0.16);

  modGain.gain.setValueAtTime(140, now);
  modGain.gain.exponentialRampToValueAtTime(5, now + 0.12);

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);

  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(1200, now);
  bandpass.frequency.exponentialRampToValueAtTime(450, now + 0.18);
  bandpass.Q.setValueAtTime(2.2, now);

  masterGain.gain.setValueAtTime(0.22, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.20);

  carrier.connect(bandpass);
  bandpass.connect(masterGain);
  masterGain.connect(destination);

  carrier.start(now);
  modulator.start(now);
  carrier.stop(now + 0.21);
  modulator.stop(now + 0.21);

  return { nodes: [carrier, modulator, modGain, bandpass, masterGain], endTime: now + 0.21 };
};
