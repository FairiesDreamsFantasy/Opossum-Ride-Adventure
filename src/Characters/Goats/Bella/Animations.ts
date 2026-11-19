/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const BELLA_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 450
};

export const BELLA_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 330,
  duration: 0.45,
  fmRate: 18,
  fmDepth: 0.03,
  oscType: "sine",
  secondOscType: "triangle",
  secondOscFreqRatio: 2.0,
  pitchSweepRatio: 0.8
};

export const BELLA_PALETTE: GoatCameoPalette = {
  coatPrimary: "#FEF3C7",
  coatSecondary: "#FDE68A",
  bellyColor: "#FFFBEB",
  earOuter: "#FEF3C7",
  earInner: "#FBCFE8",
  hornColorHex: "#F59E0B",
  hornStyle: "standard",
  eyeColorHex: "#3B82F6",
  hoofColor: "#78350F",
  muzzleColor: "#FDE68A",
  pattern: "solid"
};
