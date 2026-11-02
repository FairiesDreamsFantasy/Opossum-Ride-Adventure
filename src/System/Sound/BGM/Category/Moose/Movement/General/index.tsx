/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Common helpers for procedural moose movement synthesis
 */
export const createMooseHoofThump = (
  context: AudioContext,
  destination: AudioNode,
  time: number,
  freq = 65,
  decay = 0.2,
  volume = 0.5
) => {
  const osc = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  // Set filter
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(150, time);
  filter.frequency.exponentialRampToValueAtTime(40, time + decay);

  // Set oscillator
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, time);
  osc.frequency.exponentialRampToValueAtTime(25, time + decay);

  // Set gain envelope
  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

  osc.start(time);
  osc.stop(time + decay + 0.05);

  return { osc, gain, filter, endTime: time + decay };
};
