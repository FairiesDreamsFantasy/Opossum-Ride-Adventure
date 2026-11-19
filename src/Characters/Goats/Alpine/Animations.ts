/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const ALPINE_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 450
};

export const ALPINE_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 240,
  duration: 0.9,
  fmRate: 14,
  fmDepth: 0.06,
  oscType: "sawtooth",
  pitchSweepRatio: 0.72
};

export const ALPINE_PALETTE: GoatCameoPalette = {
  coatPrimary: "#F8FAFC",
  coatSecondary: "#64748B",
  coatMarkings: "#475569",
  bellyColor: "#E2E8F0",
  earOuter: "#475569",
  earInner: "#E2E8F0",
  hornColorHex: "#1E293B",
  hornStyle: "curved_ram",
  eyeColorHex: "#7DD3FC",
  hoofColor: "#0F172A",
  muzzleColor: "#94A3B8",
  pattern: "bicolor_alpine"
};
