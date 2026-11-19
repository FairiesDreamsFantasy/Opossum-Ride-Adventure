/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { LUNA_DESCRIPTION } from "./Description";
import { LUNA_DIMENSIONS } from "./Dimensions";
import { LUNA_AUDIO_PARAMS, LUNA_GAIT_FREQUENCIES, LUNA_PALETTE } from "./Animations";
import { LUNA_MOVEMENTS } from "./Movements";

export const LUNA_CAMEO: GoatCameoProfile = {
  id: LUNA_DESCRIPTION.id,
  name: LUNA_DESCRIPTION.name,
  gender: LUNA_DESCRIPTION.gender,
  ageClass: LUNA_DESCRIPTION.ageClass,
  color: LUNA_DESCRIPTION.color,
  hornColor: LUNA_DESCRIPTION.hornColor,
  eyeColor: LUNA_DESCRIPTION.eyeColor,
  description: LUNA_DESCRIPTION.text,
  cameoOrigin: LUNA_DESCRIPTION.cameoOrigin,
  dimensions: LUNA_DIMENSIONS,
  audio: LUNA_AUDIO_PARAMS,
  gait: LUNA_GAIT_FREQUENCIES,
  palette: LUNA_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: LUNA_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: LUNA_MOVEMENTS.socialChatterRate,
    rampAgility: LUNA_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
