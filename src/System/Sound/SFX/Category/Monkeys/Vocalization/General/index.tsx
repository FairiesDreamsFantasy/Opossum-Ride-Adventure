/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Screech Synthesis for Monkeys:
 * High-agility frequency-modulated carrier and formant bandpass filter.
 */
export const playMonkeyScreech = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  options: { baseFreq?: number; modFreq?: number; modDepth?: number; duration?: number; volume?: number } = {}
) => {
  const now = startTime;
  const baseFreq = options.baseFreq ?? 1250;
  const modFreq = options.modFreq ?? 190;
  const modDepth = options.modDepth ?? 450;
  const duration = options.duration ?? 0.38;
  const volume = options.volume ?? 0.25;

  const modulator = context.createOscillator();
  const modGain = context.createGain();
  const carrier = context.createOscillator();
  const sfxGain = context.createGain();
  const formantFilter = context.createBiquadFilter();

  formantFilter.type = "bandpass";
  formantFilter.frequency.setValueAtTime(baseFreq * 1.45, now);
  formantFilter.Q.setValueAtTime(3.8, now);

  modulator.type = "sawtooth";
  modulator.frequency.setValueAtTime(modFreq, now);
  modGain.gain.setValueAtTime(modDepth, now);

  carrier.type = "triangle";
  carrier.frequency.setValueAtTime(baseFreq, now);
  carrier.frequency.exponentialRampToValueAtTime(baseFreq * 1.55, now + 0.12);
  carrier.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, now + duration);

  sfxGain.gain.setValueAtTime(0.001, now);
  sfxGain.gain.linearRampToValueAtTime(volume, now + 0.04);
  sfxGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);
  carrier.connect(formantFilter);
  formantFilter.connect(sfxGain);
  sfxGain.connect(destination);

  const endTime = now + duration;
  modulator.start(now);
  carrier.start(now);
  modulator.stop(endTime);
  carrier.stop(endTime);

  return { nodes: [modulator, modGain, carrier, sfxGain, formantFilter], endTime };
};
