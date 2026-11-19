/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const WILLOW_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 200
};

export const WILLOW_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 310,
  duration: 0.52,
  fmRate: 20,
  fmDepth: 0.04,
  oscType: "triangle",
  pitchSweepRatio: 0.8
};

export const WILLOW_PALETTE: GoatCameoPalette = {
  coatPrimary: "#A16207",
  coatSecondary: "#713F12",
  coatMarkings: "#FEF3C7",
  bellyColor: "#D97706",
  earOuter: "#713F12",
  earInner: "#FDE68A",
  hornColorHex: "#E7E5E4",
  hornStyle: "budding",
  eyeColorHex: "#16A34A",
  hoofColor: "#451A03",
  muzzleColor: "#CA8A04",
  pattern: "dappled"
};
