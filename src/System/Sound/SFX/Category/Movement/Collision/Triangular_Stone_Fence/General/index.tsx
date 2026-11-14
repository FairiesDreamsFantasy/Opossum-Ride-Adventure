/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Triangular Stone Fence Collision General Synthesis
 * Emulates crisp 1650 Hz Slate block clack and stacked-tier shift when colliding with
 * stacked triangular slate fence blocks in Crop Fields.
 */
export const playTriangularStoneFenceCollisionGeneral = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;

  const osc = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(165.0, now);
  osc.frequency.exponentialRampToValueAtTime(52.0, now + 0.28);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1650.0, now);
  filter.Q.setValueAtTime(4.8, now);

  gain.gain.setValueAtTime(0.32, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  osc.start(now);
  osc.stop(now + 0.32);

  return { nodes: [osc, filter, gain], endTime: now + 0.32 };
};
