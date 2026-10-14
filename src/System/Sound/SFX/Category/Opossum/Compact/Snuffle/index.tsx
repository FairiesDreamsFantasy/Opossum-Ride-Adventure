/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompactOpossumSnuffleSFXConfig } from "./General";
export * from "./General";

let localCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!localCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      localCtx = new AudioContextClass();
    }
  }
  if (localCtx && localCtx.state === "suspended") {
    localCtx.resume().catch(() => {});
  }
  return localCtx;
}

/**
 * Procedural snuffle synthesizer for compact opossums.
 * Generates natural exploratory marsupial snuffling without cloud dependencies.
 */
export function playCompactOpossumSnuffle(pitch = 1.0) {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const cfg = CompactOpossumSnuffleSFXConfig;
  const freq = cfg.baseFrequency * pitch;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.72, now + cfg.duration);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(freq * 1.15, now);
  filter.Q.setValueAtTime(cfg.filterQ, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(cfg.defaultGain, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + cfg.duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + cfg.duration);
}

export const CompactOpossumSnuffleAudio = {
  Config: CompactOpossumSnuffleSFXConfig,
  play: playCompactOpossumSnuffle
};
