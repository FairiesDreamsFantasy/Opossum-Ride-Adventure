/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompactOpossumMovementSFXConfig } from "./General";
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
 * Procedural movement synthesizer for compact opossums.
 * Synthesizes rapid 2.2Hz strides with footfall thuds, claw contacts, and breath sweeps.
 */
export function playCompactOpossumMovement(type: "strideThud" | "clawClick" | "stridePant" = "strideThud", pitch = 1.0) {
  const ctx = getContext();
  if (!ctx) return;

  const cfg = CompactOpossumMovementSFXConfig.soundProfiles[type] || CompactOpossumMovementSFXConfig.soundProfiles.strideThud;
  const now = ctx.currentTime;
  const freq = cfg.baseFrequency * pitch;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = cfg.type as OscillatorType;
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * 0.65), now + cfg.duration);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(cfg.filterFreq * pitch, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(cfg.gain, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + cfg.duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + cfg.duration);
}

export const CompactOpossumMovementAudio = {
  Config: CompactOpossumMovementSFXConfig,
  play: playCompactOpossumMovement
};
