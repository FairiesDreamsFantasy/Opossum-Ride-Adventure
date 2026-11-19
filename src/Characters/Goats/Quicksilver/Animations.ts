/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const QUICKSILVER_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 450
};

export const QUICKSILVER_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 350,
  duration: 0.42,
  fmRate: 32,
  fmDepth: 0.05,
  oscType: "sine",
  pitchSweepRatio: 1.35
};

export const QUICKSILVER_PALETTE: GoatCameoPalette = {
  coatPrimary: "#CBD5E1",
  coatSecondary: "#94A3B8",
  bellyColor: "#E2E8F0",
  earOuter: "#94A3B8",
  earInner: "#E2E8F0",
  hornColorHex: "#E2E8F0",
  hornStyle: "standard",
  eyeColorHex: "#3B82F6",
  hoofColor: "#334155",
  muzzleColor: "#CBD5E1",
  pattern: "solid"
};
