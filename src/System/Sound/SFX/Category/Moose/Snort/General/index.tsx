/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Snort Synthesis:
 * Combines white-noise flutter, bandpass resonance, and triangular nostril vibration.
 */
export const playMooseSnort = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const now = startTime;

  // Flutter / vibration osc
  const osc = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(350, now);
  filter.frequency.linearRampToValueAtTime(180, now + 0.4);
  filter.Q.setValueAtTime(4.0, now);

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(110, now);
  osc.frequency.linearRampToValueAtTime(65, now + 0.4);

  // Flutter modulation (LFO)
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain); // modulate overall volume

  lfo.type = "sawtooth";
  lfo.frequency.setValueAtTime(32, now); // 32Hz flutter
  lfoGain.gain.setValueAtTime(0.18, now);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

  lfo.start(now);
  osc.start(now);

  lfo.stop(now + 0.45);
  osc.stop(now + 0.45);

  return { nodes: [osc, gain, filter, lfo, lfoGain], endTime: now + 0.45 };
};
