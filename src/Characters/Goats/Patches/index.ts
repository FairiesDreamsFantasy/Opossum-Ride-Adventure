/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { PATCHES_DESCRIPTION } from "./Description";
import { PATCHES_DIMENSIONS } from "./Dimensions";
import { PATCHES_AUDIO_PARAMS, PATCHES_GAIT_FREQUENCIES, PATCHES_PALETTE } from "./Animations";
import { PATCHES_MOVEMENTS } from "./Movements";

export const PATCHES_CAMEO: GoatCameoProfile = {
  id: PATCHES_DESCRIPTION.id,
  name: PATCHES_DESCRIPTION.name,
  gender: PATCHES_DESCRIPTION.gender,
  ageClass: PATCHES_DESCRIPTION.ageClass,
  color: PATCHES_DESCRIPTION.color,
  hornColor: PATCHES_DESCRIPTION.hornColor,
  eyeColor: PATCHES_DESCRIPTION.eyeColor,
  description: PATCHES_DESCRIPTION.text,
  cameoOrigin: PATCHES_DESCRIPTION.cameoOrigin,
  dimensions: PATCHES_DIMENSIONS,
  audio: PATCHES_AUDIO_PARAMS,
  gait: PATCHES_GAIT_FREQUENCIES,
  palette: PATCHES_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: PATCHES_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: PATCHES_MOVEMENTS.socialChatterRate,
    rampAgility: PATCHES_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
