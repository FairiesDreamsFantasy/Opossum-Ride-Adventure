/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { SHADOW_DESCRIPTION } from "./Description";
import { SHADOW_DIMENSIONS } from "./Dimensions";
import { SHADOW_AUDIO_PARAMS, SHADOW_GAIT_FREQUENCIES, SHADOW_PALETTE } from "./Animations";
import { SHADOW_MOVEMENTS } from "./Movements";

export const SHADOW_CAMEO: GoatCameoProfile = {
  id: SHADOW_DESCRIPTION.id,
  name: SHADOW_DESCRIPTION.name,
  gender: SHADOW_DESCRIPTION.gender,
  ageClass: SHADOW_DESCRIPTION.ageClass,
  color: SHADOW_DESCRIPTION.color,
  hornColor: SHADOW_DESCRIPTION.hornColor,
  eyeColor: SHADOW_DESCRIPTION.eyeColor,
  description: SHADOW_DESCRIPTION.text,
  cameoOrigin: SHADOW_DESCRIPTION.cameoOrigin,
  dimensions: SHADOW_DIMENSIONS,
  audio: SHADOW_AUDIO_PARAMS,
  gait: SHADOW_GAIT_FREQUENCIES,
  palette: SHADOW_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: SHADOW_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: SHADOW_MOVEMENTS.socialChatterRate,
    rampAgility: SHADOW_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
