/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const FRECKLES_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 200
};

export const FRECKLES_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 295,
  duration: 0.32,
  fmRate: 24,
  fmDepth: 0.09,
  oscType: "square",
  pitchSweepRatio: 1.15
};

export const FRECKLES_PALETTE: GoatCameoPalette = {
  coatPrimary: "#FEFCE8",
  coatSecondary: "#92400E",
  coatMarkings: "#78350F",
  bellyColor: "#FEF9C3",
  earOuter: "#92400E",
  earInner: "#FBCFE8",
  hornColorHex: "#D97706",
  hornStyle: "standard",
  eyeColorHex: "#A16207",
  hoofColor: "#451A03",
  muzzleColor: "#FDE68A",
  pattern: "spotted"
};
