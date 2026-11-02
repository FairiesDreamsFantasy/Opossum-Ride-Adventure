/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MonkeyJumpOptions, MonkeyJumpGeneral } from "./General";

export * from "./General";

/**
 * Procedural Monkey Jump Synthesis:
 * Combines an upward elastic whoosh swoop with a chirpy vocal squeak and branch tension release.
 */
export const playMonkeyJump = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: MonkeyJumpOptions = {}
) => {
  const now = startTime;
  const pitchMult = options.pitch ?? 1.0;
  const velocity = Math.max(0.5, Math.min(2.0, options.velocity ?? 1.0));
  const volume = options.volume ?? 0.32;
  const style = options.style ?? "acrobatic_vault";

  const duration = (MonkeyJumpGeneral.defaults.duration / velocity) * 0.9;
  const baseFreq = MonkeyJumpGeneral.defaults.baseFreqHz * pitchMult;
  const peakFreq = MonkeyJumpGeneral.defaults.peakFreqHz * pitchMult * (style === "branch_spring" ? 1.25 : 1.0);

  // 1. Aerodynamic Elastic Whoosh Swoop
  const swooshOsc = context.createOscillator();
  const swooshFilter = context.createBiquadFilter();
  const swooshGain = context.createGain();

  swooshFilter.type = "bandpass";
  swooshFilter.frequency.setValueAtTime(baseFreq * 1.2, now);
  swooshFilter.frequency.exponentialRampToValueAtTime(peakFreq * 1.5, now + duration * 0.6);
  swooshFilter.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + duration);
  swooshFilter.Q.setValueAtTime(2.8, now);

  swooshOsc.type = "triangle";
  swooshOsc.frequency.setValueAtTime(baseFreq, now);
  swooshOsc.frequency.exponentialRampToValueAtTime(peakFreq, now + duration * 0.7);

  swooshGain.gain.setValueAtTime(0.001, now);
  swooshGain.gain.linearRampToValueAtTime(volume * 0.7, now + duration * 0.2);
  swooshGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  swooshOsc.connect(swooshFilter);
  swooshFilter.connect(swooshGain);
  swooshGain.connect(destination);

  // 2. Playful Upward Chirp Layer (The monkey's joyful leap reaction)
  const chirpOsc = context.createOscillator();
  const chirpGain = context.createGain();

  chirpOsc.type = "sine";
  chirpOsc.frequency.setValueAtTime(baseFreq * 2.2, now + duration * 0.1);
  chirpOsc.frequency.exponentialRampToValueAtTime(peakFreq * 2.8, now + duration * 0.65);
  chirpOsc.frequency.exponentialRampToValueAtTime(peakFreq * 1.6, now + duration * 0.95);

  chirpGain.gain.setValueAtTime(0.0001, now);
  chirpGain.gain.setValueAtTime(0.001, now + duration * 0.1);
  chirpGain.gain.linearRampToValueAtTime(volume * 0.45, now + duration * 0.35);
  chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  chirpOsc.connect(chirpGain);
  chirpGain.connect(destination);

  // 3. Branch Tension Rebound (Only for branch spring or vault)
  const springOsc = context.createOscillator();
  const springGain = context.createGain();

  springOsc.type = "sawtooth";
  springOsc.frequency.setValueAtTime(MonkeyJumpGeneral.defaults.springModHz * 4, now);
  springOsc.frequency.linearRampToValueAtTime(MonkeyJumpGeneral.defaults.springModHz * 1.5, now + 0.18);

  springGain.gain.setValueAtTime(volume * 0.25, now);
  springGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

  springOsc.connect(springGain);
  springGain.connect(destination);

  swooshOsc.start(now);
  chirpOsc.start(now + duration * 0.1);
  springOsc.start(now);

  const endTime = now + duration;
  swooshOsc.stop(endTime);
  chirpOsc.stop(endTime);
  springOsc.stop(now + 0.2);

  return { nodes: [swooshOsc, chirpOsc, springOsc, swooshGain, chirpGain, springGain], endTime };
};
