/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { OBSIDIAN_DESCRIPTION } from "./Description";
import { OBSIDIAN_DIMENSIONS } from "./Dimensions";
import { OBSIDIAN_AUDIO_PARAMS, OBSIDIAN_GAIT_FREQUENCIES, OBSIDIAN_PALETTE } from "./Animations";
import { OBSIDIAN_MOVEMENTS } from "./Movements";

export const OBSIDIAN_CAMEO: GoatCameoProfile = {
  id: OBSIDIAN_DESCRIPTION.id,
  name: OBSIDIAN_DESCRIPTION.name,
  gender: OBSIDIAN_DESCRIPTION.gender,
  ageClass: OBSIDIAN_DESCRIPTION.ageClass,
  color: OBSIDIAN_DESCRIPTION.color,
  hornColor: OBSIDIAN_DESCRIPTION.hornColor,
  eyeColor: OBSIDIAN_DESCRIPTION.eyeColor,
  description: OBSIDIAN_DESCRIPTION.text,
  cameoOrigin: OBSIDIAN_DESCRIPTION.cameoOrigin,
  dimensions: OBSIDIAN_DIMENSIONS,
  audio: OBSIDIAN_AUDIO_PARAMS,
  gait: OBSIDIAN_GAIT_FREQUENCIES,
  palette: OBSIDIAN_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: OBSIDIAN_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: OBSIDIAN_MOVEMENTS.socialChatterRate,
    rampAgility: OBSIDIAN_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
