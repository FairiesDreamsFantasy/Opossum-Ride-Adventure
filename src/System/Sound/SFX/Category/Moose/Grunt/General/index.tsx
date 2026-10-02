/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Grunt Synthesis:
 * A quick, raspy low throat grunt.
 */
export const playMooseGrunt = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const now = startTime;
  const duration = 0.28;

  const osc = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(250, now);
  filter.frequency.exponentialRampToValueAtTime(70, now + duration);

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(105, now);
  osc.frequency.exponentialRampToValueAtTime(50, now + duration);

  // Add slight raspiness (noise modulation)
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  lfo.type = "square";
  lfo.frequency.setValueAtTime(45, now); // high-speed modulation
  lfoGain.gain.setValueAtTime(15, now);

  gain.gain.setValueAtTime(0.45, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  lfo.start(now);
  osc.start(now);

  lfo.stop(now + duration + 0.05);
  osc.stop(now + duration + 0.05);

  return { nodes: [osc, gain, filter, lfo, lfoGain], endTime: now + duration };
};
