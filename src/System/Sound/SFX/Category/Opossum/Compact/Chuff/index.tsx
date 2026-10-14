/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompactOpossumChuffSFXConfig } from "./General";
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
 * Procedural chuff synthesizer for compact opossums.
 * Generates natural marsupial social chuff exhalations.
 */
export function playCompactOpossumChuff(pitch = 1.0) {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const cfg = CompactOpossumChuffSFXConfig;
  const freq = cfg.baseFrequency * pitch;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.68, now + cfg.duration);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(freq * 1.1, now);
  filter.Q.setValueAtTime(2.2, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(cfg.defaultGain, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + cfg.duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + cfg.duration);
}

export const CompactOpossumChuffAudio = {
  Config: CompactOpossumChuffSFXConfig,
  play: playCompactOpossumChuff
};
