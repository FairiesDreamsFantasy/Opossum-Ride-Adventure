/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { BELLA_DESCRIPTION } from "./Description";
import { BELLA_DIMENSIONS } from "./Dimensions";
import { BELLA_AUDIO_PARAMS, BELLA_GAIT_FREQUENCIES, BELLA_PALETTE } from "./Animations";
import { BELLA_MOVEMENTS } from "./Movements";

export const BELLA_CAMEO: GoatCameoProfile = {
  id: BELLA_DESCRIPTION.id,
  name: BELLA_DESCRIPTION.name,
  gender: BELLA_DESCRIPTION.gender,
  ageClass: BELLA_DESCRIPTION.ageClass,
  color: BELLA_DESCRIPTION.color,
  hornColor: BELLA_DESCRIPTION.hornColor,
  eyeColor: BELLA_DESCRIPTION.eyeColor,
  description: BELLA_DESCRIPTION.text,
  cameoOrigin: BELLA_DESCRIPTION.cameoOrigin,
  dimensions: BELLA_DIMENSIONS,
  audio: BELLA_AUDIO_PARAMS,
  gait: BELLA_GAIT_FREQUENCIES,
  palette: BELLA_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: BELLA_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: BELLA_MOVEMENTS.socialChatterRate,
    rampAgility: BELLA_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
