/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { WILLOW_DESCRIPTION } from "./Description";
import { WILLOW_DIMENSIONS } from "./Dimensions";
import { WILLOW_AUDIO_PARAMS, WILLOW_GAIT_FREQUENCIES, WILLOW_PALETTE } from "./Animations";
import { WILLOW_MOVEMENTS } from "./Movements";

export const WILLOW_CAMEO: GoatCameoProfile = {
  id: WILLOW_DESCRIPTION.id,
  name: WILLOW_DESCRIPTION.name,
  gender: WILLOW_DESCRIPTION.gender,
  ageClass: WILLOW_DESCRIPTION.ageClass,
  color: WILLOW_DESCRIPTION.color,
  hornColor: WILLOW_DESCRIPTION.hornColor,
  eyeColor: WILLOW_DESCRIPTION.eyeColor,
  description: WILLOW_DESCRIPTION.text,
  cameoOrigin: WILLOW_DESCRIPTION.cameoOrigin,
  dimensions: WILLOW_DIMENSIONS,
  audio: WILLOW_AUDIO_PARAMS,
  gait: WILLOW_GAIT_FREQUENCIES,
  palette: WILLOW_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: WILLOW_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: WILLOW_MOVEMENTS.socialChatterRate,
    rampAgility: WILLOW_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
