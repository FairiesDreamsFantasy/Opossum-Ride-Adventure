/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const SNOWY_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 200
};

export const SNOWY_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 230,
  duration: 0.55,
  fmRate: 16,
  fmDepth: 0.04,
  oscType: "sawtooth",
  pitchSweepRatio: 0.8
};

export const SNOWY_PALETTE: GoatCameoPalette = {
  coatPrimary: "#FFFFFF",
  coatSecondary: "#F1F5F9",
  bellyColor: "#F8FAFC",
  earOuter: "#FFFFFF",
  earInner: "#FCE4EC",
  hornColorHex: "#FFF9E3",
  hornStyle: "standard",
  eyeColorHex: "#FBBF24",
  hoofColor: "#334155",
  muzzleColor: "#FDE2E4",
  pattern: "solid"
};
