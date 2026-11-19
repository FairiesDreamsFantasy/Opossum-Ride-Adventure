/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const THUNDER_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 450
};

export const THUNDER_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 125,
  duration: 0.95,
  fmRate: 8,
  fmDepth: 0.12,
  oscType: "sawtooth",
  secondOscType: "triangle",
  secondOscFreqRatio: 1.5,
  filterFreq: 350,
  filterType: "lowpass",
  pitchSweepRatio: 0.8
};

export const THUNDER_PALETTE: GoatCameoPalette = {
  coatPrimary: "#94A3B8",
  coatSecondary: "#64748B",
  bellyColor: "#CBD5E1",
  earOuter: "#64748B",
  earInner: "#CBD5E1",
  hornColorHex: "#1E293B",
  hornStyle: "curved_ram",
  eyeColorHex: "#78350F",
  hoofColor: "#0F172A",
  muzzleColor: "#475569",
  pattern: "solid"
};
