/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const OBSIDIAN_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 450
};

export const OBSIDIAN_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 110,
  duration: 0.75,
  fmRate: 13,
  fmDepth: 0.09,
  oscType: "sawtooth",
  secondOscType: "square",
  secondOscFreqRatio: 3.0,
  filterFreq: 750,
  filterType: "peaking",
  filterQ: 8,
  pitchSweepRatio: 0.8
};

export const OBSIDIAN_PALETTE: GoatCameoPalette = {
  coatPrimary: "#111827",
  coatSecondary: "#030712",
  bellyColor: "#1F2937",
  earOuter: "#030712",
  earInner: "#374151",
  hornColorHex: "#1E1B4B",
  hornStyle: "curved_ram",
  eyeColorHex: "#991B1B",
  hoofColor: "#000000",
  muzzleColor: "#111827",
  pattern: "solid"
};
