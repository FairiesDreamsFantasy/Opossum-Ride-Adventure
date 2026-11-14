/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playTriangularStoneFenceCollisionGeneral } from "./General";

/**
 * Procedural Triangular Stone Fence Collision Sound
 * Multi-tier stacked slate block clack (1650 Hz resonant profile) plus heavy 105 Hz slate thud.
 */
export const playTriangularStoneFenceCollision = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;

  // Low slate base thud (105 Hz -> 32 Hz)
  const carrier = context.createOscillator();
  const modulator = context.createOscillator();
  const modGain = context.createGain();
  const filter = context.createBiquadFilter();
  const masterGain = context.createGain();

  carrier.type = "sine";
  carrier.frequency.setValueAtTime(105.0, now);
  carrier.frequency.exponentialRampToValueAtTime(32.0, now + 0.32);

  modulator.type = "triangle";
  modulator.frequency.setValueAtTime(210.0, now);
  modulator.frequency.exponentialRampToValueAtTime(64.0, now + 0.32);

  modGain.gain.setValueAtTime(260.0, now);
  modGain.gain.exponentialRampToValueAtTime(12.0, now + 0.24);

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1650.0, now);
  filter.frequency.exponentialRampToValueAtTime(240.0, now + 0.34);
  filter.Q.setValueAtTime(4.8, now);

  masterGain.gain.setValueAtTime(0.36, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);

  carrier.connect(filter);
  filter.connect(masterGain);
  masterGain.connect(destination);

  carrier.start(now);
  modulator.start(now);
  carrier.stop(now + 0.38);
  modulator.stop(now + 0.38);

  // Secondary stacked-slate slab clack
  const secondary = playTriangularStoneFenceCollisionGeneral(context, destination);

  return {
    nodes: [carrier, modulator, modGain, filter, masterGain, ...secondary.nodes],
    endTime: Math.max(now + 0.38, secondary.endTime)
  };
};
