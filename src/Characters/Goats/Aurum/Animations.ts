/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const AURUM_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 450
};

export const AURUM_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 200,
  duration: 1.05,
  fmRate: 12,
  fmDepth: 0.04,
  oscType: "triangle",
  secondOscType: "sawtooth",
  secondOscFreqRatio: 3.0,
  filterFreq: 1100,
  filterType: "peaking",
  filterQ: 6,
  pitchSweepRatio: 0.8
};

export const AURUM_PALETTE: GoatCameoPalette = {
  coatPrimary: "#EAB308",
  coatSecondary: "#CA8A04",
  bellyColor: "#FEF08A",
  earOuter: "#CA8A04",
  earInner: "#FEF9C3",
  hornColorHex: "#FACC15",
  hornStyle: "curved_ram",
  eyeColorHex: "#FDE047",
  hoofColor: "#713F12",
  muzzleColor: "#FACC15",
  pattern: "solid"
};
