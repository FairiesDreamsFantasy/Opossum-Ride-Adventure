/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OBJECT_SOUND_PROFILES } from "../General";

/**
 * Procedural Wind Chimes Synthesizer
 * Generates beautiful, shimmering pentatonic metal chime sweeps using mathematical delay offsets.
 */
export function playProceduralWindChimes(ctx: AudioContext, destination: AudioNode) {
  const profile = OBJECT_SOUND_PROFILES.wind_chimes;
  const now = ctx.currentTime;
  
  // High-pitch crystal scale offsets (factors of base frequency)
  const pentatonicScale = [1.0, 1.2, 1.333, 1.5, 1.8]; // Root, Minor 3rd, Perfect 4th, Perfect 5th, Minor 7th
  
  pentatonicScale.forEach((ratio, idx) => {
    const delay = idx * 0.12; // staggered timing
    const chimeFreq = profile.baseFrequency * ratio;
    const chimeDuration = profile.decaySec * (1.0 - idx * 0.08);

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Mix of sine (pure) and triangle (slightly hollow resonance)
    osc.type = idx % 2 === 0 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(chimeFreq, now + delay);
    
    // Add subtle frequency wobble (vibrato)
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(4 + idx, now + delay); // 4-8 Hz vibrato
    vibratoGain.gain.setValueAtTime(10, now + delay); // 10Hz pitch shift
    
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    gainNode.gain.setValueAtTime(0, now + delay);
    gainNode.gain.linearRampToValueAtTime(profile.gainScalar * 0.2, now + delay + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + chimeDuration);

    // Dynamic bandpass filter to capture metallic resonance
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(chimeFreq, now + delay);
    filter.Q.setValueAtTime(15, now + delay);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    vibrato.start(now + delay);
    osc.start(now + delay);

    vibrato.stop(now + delay + chimeDuration);
    osc.stop(now + delay + chimeDuration);
  });
}
