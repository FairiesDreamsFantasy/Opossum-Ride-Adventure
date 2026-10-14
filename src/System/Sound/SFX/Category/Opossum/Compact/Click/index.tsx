/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompactOpossumClickSFXConfig } from "./General";
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
 * Procedural click synthesizer for compact opossums.
 * Generates sharp percussive clicks and acoustic impulses.
 */
export function playCompactOpossumClick(pitch = 1.0) {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const cfg = CompactOpossumClickSFXConfig;
  const freq = cfg.baseFrequency * pitch;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "square";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(100, freq * 0.5), now + cfg.duration);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(freq * 1.2, now);
  filter.Q.setValueAtTime(3.0, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(cfg.defaultGain, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + cfg.duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + cfg.duration);
}

export const CompactOpossumClickAudio = {
  Config: CompactOpossumClickSFXConfig,
  play: playCompactOpossumClick
};
