/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const SHADOW_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 200
};

export const SHADOW_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 180,
  duration: 0.5,
  fmRate: 28,
  fmDepth: 0.07,
  oscType: "triangle",
  secondOscType: "sawtooth",
  secondOscFreqRatio: 2.0,
  pitchSweepRatio: 0.8
};

export const SHADOW_PALETTE: GoatCameoPalette = {
  coatPrimary: "#374151",
  coatSecondary: "#1F2937",
  bellyColor: "#4B5563",
  earOuter: "#1F2937",
  earInner: "#6B7280",
  hornColorHex: null,
  hornStyle: "none",
  eyeColorHex: "#09090B",
  hoofColor: "#111827",
  muzzleColor: "#1F2937",
  pattern: "solid"
};
