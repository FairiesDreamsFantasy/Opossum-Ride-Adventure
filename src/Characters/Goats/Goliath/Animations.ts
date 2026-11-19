/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const GOLIATH_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 500
};

export const GOLIATH_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 85,
  duration: 1.3,
  fmRate: 7,
  fmDepth: 0.15,
  oscType: "sawtooth",
  secondOscType: "sine",
  secondOscFreqRatio: 0.5,
  filterFreq: 180,
  filterType: "lowpass",
  pitchSweepRatio: 0.8
};

export const GOLIATH_PALETTE: GoatCameoPalette = {
  coatPrimary: "#78350F",
  coatSecondary: "#451A03",
  bellyColor: "#92400E",
  earOuter: "#451A03",
  earInner: "#B45309",
  hornColorHex: "#FFFBEB",
  hornStyle: "curved_ram",
  eyeColorHex: "#22C55E",
  hoofColor: "#1C1917",
  muzzleColor: "#451A03",
  pattern: "solid"
};
