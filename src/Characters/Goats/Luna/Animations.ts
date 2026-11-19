/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const LUNA_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 200
};

export const LUNA_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 270,
  duration: 0.65,
  fmRate: 15,
  fmDepth: 0.04,
  oscType: "sine",
  secondOscType: "triangle",
  secondOscFreqRatio: 2.0,
  pitchSweepRatio: 0.8
};

export const LUNA_PALETTE: GoatCameoPalette = {
  coatPrimary: "#581C87",
  coatSecondary: "#3B0764",
  bellyColor: "#7E22CE",
  earOuter: "#3B0764",
  earInner: "#E9D5FF",
  hornColorHex: "#F3E8FF",
  hornStyle: "standard",
  eyeColorHex: "#A855F7",
  hoofColor: "#2E1065",
  muzzleColor: "#6B21A8",
  pattern: "solid"
};
