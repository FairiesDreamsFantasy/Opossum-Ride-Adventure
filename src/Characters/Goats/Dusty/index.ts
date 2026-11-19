/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { DUSTY_DESCRIPTION } from "./Description";
import { DUSTY_DIMENSIONS } from "./Dimensions";
import { DUSTY_AUDIO_PARAMS, DUSTY_GAIT_FREQUENCIES, DUSTY_PALETTE } from "./Animations";
import { DUSTY_MOVEMENTS } from "./Movements";

export const DUSTY_CAMEO: GoatCameoProfile = {
  id: DUSTY_DESCRIPTION.id,
  name: DUSTY_DESCRIPTION.name,
  gender: DUSTY_DESCRIPTION.gender,
  ageClass: DUSTY_DESCRIPTION.ageClass,
  color: DUSTY_DESCRIPTION.color,
  hornColor: DUSTY_DESCRIPTION.hornColor,
  eyeColor: DUSTY_DESCRIPTION.eyeColor,
  description: DUSTY_DESCRIPTION.text,
  cameoOrigin: DUSTY_DESCRIPTION.cameoOrigin,
  dimensions: DUSTY_DIMENSIONS,
  audio: DUSTY_AUDIO_PARAMS,
  gait: DUSTY_GAIT_FREQUENCIES,
  palette: DUSTY_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: DUSTY_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: DUSTY_MOVEMENTS.socialChatterRate,
    rampAgility: DUSTY_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
