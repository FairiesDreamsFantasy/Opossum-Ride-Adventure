/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playMonkeyScreech } from "./General";

export * from "./General";

/**
 * Procedural Resonant Hoot Synthesis:
 * Low-frequency resonant cavity vocal folds with harmonic presence.
 */
export const playMonkeyHoot = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  options: { pitchHz?: number; duration?: number; volume?: number } = {}
) => {
  const now = startTime;
  const pitchHz = options.pitchHz ?? 680;
  const duration = options.duration ?? 0.28;
  const volume = options.volume ?? 0.28;

  const osc1 = context.createOscillator();
  const osc2 = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(pitchHz * 1.2, now);
  filter.Q.setValueAtTime(4.5, now);

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(pitchHz, now);
  osc1.frequency.exponentialRampToValueAtTime(pitchHz * 0.82, now + duration);

  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(pitchHz * 1.98, now);
  osc2.frequency.exponentialRampToValueAtTime(pitchHz * 1.62, now + duration);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  const endTime = now + duration;
  osc1.start(now);
  osc2.start(now);
  osc1.stop(endTime);
  osc2.stop(endTime);

  return { nodes: [osc1, osc2, filter, gain], endTime };
};

/**
 * Procedural Pant-Hoot Call:
 * Dynamic multi-burst accelerating crescendo climax.
 */
export const playMonkeyPantHoot = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  options: { burstCount?: number; baseFreq?: number; volume?: number } = {}
) => {
  const bursts = options.burstCount ?? 5;
  const baseFreq = options.baseFreq ?? 620;
  const volume = options.volume ?? 0.26;
  let t = startTime;

  for (let i = 0; i < bursts; i++) {
    const progress = i / (bursts - 1 || 1);
    const freq = baseFreq * (1 + progress * 0.85);
    const burstDur = 0.06 + progress * 0.04;
    const spacing = 0.12 - progress * 0.05; // accelerating rhythm

    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq * 1.3, t);
    filter.Q.setValueAtTime(3.0, t);

    osc.type = progress > 0.6 ? "sawtooth" : "triangle";
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.15, t + burstDur * 0.5);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.9, t + burstDur);

    const bVol = volume * (0.5 + progress * 0.5);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(bVol, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + burstDur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(t);
    osc.stop(t + burstDur);

    t += burstDur + spacing;
  }

  return { endTime: t };
};

/**
 * Procedural Canopy Alarm Call:
 * High-urgency sharp ascending whistle-chirp.
 */
export const playMonkeyAlarmCall = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  options: { pitchHz?: number; volume?: number } = {}
) => {
  const now = startTime;
  const pitchHz = options.pitchHz ?? 1750;
  const duration = 0.16;
  const volume = options.volume ?? 0.3;

  const osc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  filter.type = "highpass";
  filter.frequency.setValueAtTime(1000, now);

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(pitchHz * 0.7, now);
  osc.frequency.exponentialRampToValueAtTime(pitchHz * 1.6, now + duration * 0.4);
  osc.frequency.exponentialRampToValueAtTime(pitchHz * 1.1, now + duration);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  osc.start(now);
  osc.stop(now + duration);

  return { nodes: [osc, filter, gain], endTime: now + duration };
};

/**
 * Procedural Soft Coo Call:
 * Gentle pure tone contact trill.
 */
export const playMonkeyCooCall = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  options: { pitchHz?: number; volume?: number } = {}
) => {
  const now = startTime;
  const pitchHz = options.pitchHz ?? 980;
  const duration = 0.42;
  const volume = options.volume ?? 0.22;

  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(pitchHz, now);
  osc.frequency.linearRampToValueAtTime(pitchHz * 1.12, now + duration * 0.4);
  osc.frequency.exponentialRampToValueAtTime(pitchHz * 0.85, now + duration);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(destination);

  osc.start(now);
  osc.stop(now + duration);

  return { nodes: [osc, gain], endTime: now + duration };
};
