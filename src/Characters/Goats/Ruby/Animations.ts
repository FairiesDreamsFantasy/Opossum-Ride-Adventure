/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const RUBY_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 450
};

export const RUBY_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 150,
  duration: 0.7,
  fmRate: 22,
  fmDepth: 0.12,
  oscType: "sawtooth",
  secondOscType: "sawtooth",
  secondOscFreqRatio: 1.01,
  pitchSweepRatio: 0.8
};

export const RUBY_PALETTE: GoatCameoPalette = {
  coatPrimary: "#9A3412",
  coatSecondary: "#7C2D12",
  bellyColor: "#C2410C",
  earOuter: "#7C2D12",
  earInner: "#FDBA74",
  hornColorHex: "#451A03",
  hornStyle: "standard",
  eyeColorHex: "#FBBF24",
  hoofColor: "#292524",
  muzzleColor: "#7C2D12",
  pattern: "solid"
};
