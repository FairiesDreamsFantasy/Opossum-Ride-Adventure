/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const GINGER_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 200
};

export const GINGER_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 250,
  duration: 0.48,
  fmRate: 21,
  fmDepth: 0.06,
  oscType: "sawtooth",
  pitchSweepRatio: 0.8
};

export const GINGER_PALETTE: GoatCameoPalette = {
  coatPrimary: "#EA580C",
  coatSecondary: "#C2410C",
  bellyColor: "#FDBA74",
  earOuter: "#C2410C",
  earInner: "#FDE68A",
  hornColorHex: "#F8FAFC",
  hornStyle: "standard",
  eyeColorHex: "#FBBF24",
  hoofColor: "#451A03",
  muzzleColor: "#FED7AA",
  pattern: "solid"
};
