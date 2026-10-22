/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OBJECT_SOUND_PROFILES } from "../General";

/**
 * Procedural Windmill Sail rotation synthesizer
 * Emits a low-frequency hum modulated by a 1.25 Hz LFO to simulate blades rotating through the air.
 */
export function playProceduralWindmill(ctx: AudioContext, destination: AudioNode) {
  const profile = OBJECT_SOUND_PROFILES.windmill;
  const now = ctx.currentTime;
  
  // Low hum oscillator (blades cutting the air)
  const humOsc = ctx.createOscillator();
  const humGain = ctx.createGain();
  
  humOsc.type = "sine";
  humOsc.frequency.setValueAtTime(profile.baseFrequency, now);
  
  // LFO to simulate cyclic blade swoosh (1.25 Hz, i.e., 75 RPM windmill rotation)
  const swooshLfo = ctx.createOscillator();
  const swooshGain = ctx.createGain();
  swooshLfo.type = "sine";
  swooshLfo.frequency.setValueAtTime(1.25, now);
  swooshGain.gain.setValueAtTime(0.4, now); // amplitude swing

  swooshLfo.connect(swooshGain);
  swooshGain.connect(humGain.gain);

  humGain.gain.setValueAtTime(profile.gainScalar * 0.4, now);
  
  // High-pass filter to simulate wind friction
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "lowpass";
  bandpass.frequency.setValueAtTime(180, now);

  humOsc.connect(bandpass);
  bandpass.connect(humGain);
  humGain.connect(destination);

  swooshLfo.start(now);
  humOsc.start(now);

  swooshLfo.stop(now + profile.decaySec);
  humOsc.stop(now + profile.decaySec);

  // Layer 2: Rhythmic wooden mechanical creaks
  const creakOsc = ctx.createOscillator();
  const creakGain = ctx.createGain();
  creakOsc.type = "triangle";
  creakOsc.frequency.setValueAtTime(120, now);
  
  // Frequency sweep to simulate stretching timber
  creakOsc.frequency.exponentialRampToValueAtTime(180, now + 0.15);
  
  creakGain.gain.setValueAtTime(0, now);
  creakGain.gain.linearRampToValueAtTime(profile.gainScalar * 0.15, now + 0.05);
  creakGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  creakOsc.connect(creakGain);
  creakGain.connect(destination);

  creakOsc.start(now);
  creakOsc.stop(now + 0.25);
}
