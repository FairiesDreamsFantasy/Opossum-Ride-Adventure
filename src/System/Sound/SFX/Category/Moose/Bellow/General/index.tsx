/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Bellow Synthesis:
 * Heavy guttural roar using low-frequency detuned oscillators and a slow animalistic band-filter sweep.
 */
export const playMooseBellow = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const now = startTime;
  const duration = 1.2; // Long guttural call

  const osc1 = context.createOscillator();
  const osc2 = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  // Guttural detune
  osc1.type = "sawtooth";
  osc1.frequency.setValueAtTime(85, now);
  osc1.frequency.linearRampToValueAtTime(60, now + duration);

  osc2.type = "sawtooth";
  osc2.frequency.setValueAtTime(82, now);
  osc2.frequency.linearRampToValueAtTime(58, now + duration);

  // Formant-like filter sweep
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(450, now);
  filter.frequency.exponentialRampToValueAtTime(120, now + duration);
  filter.Q.setValueAtTime(5.0, now);

  // Shaking vibrato (LFO)
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.frequency);
  lfoGain.connect(osc2.frequency);

  lfo.type = "sine";
  lfo.frequency.setValueAtTime(12, now); // 12Hz rapid animal roar tremor
  lfoGain.gain.setValueAtTime(5, now); // 5Hz frequency drift

  // Volume envelope: growl rise then fall
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.6, now + 0.35); // Loud bellow swell
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  lfo.start(now);
  osc1.start(now);
  osc2.start(now);

  lfo.stop(now + duration + 0.1);
  osc1.stop(now + duration + 0.1);
  osc2.stop(now + duration + 0.1);

  return { nodes: [osc1, osc2, gain, filter, lfo, lfoGain], endTime: now + duration };
};
