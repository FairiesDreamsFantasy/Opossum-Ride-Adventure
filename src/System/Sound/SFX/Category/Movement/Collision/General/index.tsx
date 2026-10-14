/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Crash Sound (General Collision)
 */
export const playCrashSound = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  const carrier = context.createOscillator();
  const modulator = context.createOscillator();
  const modGain = context.createGain();
  const filter = context.createBiquadFilter();
  const masterGain = context.createGain();

  carrier.type = "sine";
  carrier.frequency.setValueAtTime(160, now);
  carrier.frequency.exponentialRampToValueAtTime(32, now + 0.42);

  modulator.type = "sawtooth";
  modulator.frequency.setValueAtTime(320, now);
  modulator.frequency.exponentialRampToValueAtTime(64, now + 0.42);

  modGain.gain.setValueAtTime(280, now);
  modGain.gain.exponentialRampToValueAtTime(10, now + 0.35);

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1500, now);
  filter.frequency.exponentialRampToValueAtTime(220, now + 0.44);

  masterGain.gain.setValueAtTime(0.315, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

  carrier.connect(filter);
  filter.connect(masterGain);
  masterGain.connect(destination);

  const endTime = now + 0.48;
  carrier.start(now);
  modulator.start(now);
  carrier.stop(endTime);
  modulator.stop(endTime);

  return { nodes: [carrier, modulator, modGain, filter, masterGain], endTime };
};
