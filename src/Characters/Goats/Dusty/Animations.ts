/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const DUSTY_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 450
};

export const DUSTY_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 175,
  duration: 0.85,
  fmRate: 13,
  fmDepth: 0.07,
  oscType: "sawtooth",
  filterFreq: 550,
  filterType: "bandpass",
  filterQ: 4,
  pitchSweepRatio: 0.8
};

export const DUSTY_PALETTE: GoatCameoPalette = {
  coatPrimary: "#D2B48C",
  coatSecondary: "#A88B63",
  bellyColor: "#E5D3B3",
  earOuter: "#A88B63",
  earInner: "#E5D3B3",
  hornColorHex: "#9CA3AF",
  hornStyle: "standard",
  eyeColorHex: "#A16207",
  hoofColor: "#374151",
  muzzleColor: "#C4A484",
  pattern: "solid"
};
