/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const PATCHES_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.0,
  trot: 1.5,
  canter: 2.2,
  gallop: 3.0,
  viriable: 1.8,
  interval: 200
};

export const PATCHES_AUDIO_PARAMS: GoatCameoAudioParams = {
  baseFreq: 195,
  duration: 0.78,
  fmRate: 11,
  fmDepth: 0.16,
  oscType: "sawtooth",
  pitchSweepRatio: 0.65
};

export const PATCHES_PALETTE: GoatCameoPalette = {
  coatPrimary: "#FFFBEB",
  coatSecondary: "#92400E",
  coatMarkings: "#1F2937",
  bellyColor: "#FEF3C7",
  earOuter: "#78350F",
  earInner: "#FBCFE8",
  hornColorHex: "#FFF9E3",
  hornStyle: "standard",
  eyeColorHex: "#78350F",
  hoofColor: "#1E293B",
  muzzleColor: "#FDE68A",
  pattern: "tricolor"
};
