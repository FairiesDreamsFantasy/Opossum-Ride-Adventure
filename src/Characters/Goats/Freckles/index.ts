/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { FRECKLES_DESCRIPTION } from "./Description";
import { FRECKLES_DIMENSIONS } from "./Dimensions";
import { FRECKLES_AUDIO_PARAMS, FRECKLES_GAIT_FREQUENCIES, FRECKLES_PALETTE } from "./Animations";
import { FRECKLES_MOVEMENTS } from "./Movements";

export const FRECKLES_CAMEO: GoatCameoProfile = {
  id: FRECKLES_DESCRIPTION.id,
  name: FRECKLES_DESCRIPTION.name,
  gender: FRECKLES_DESCRIPTION.gender,
  ageClass: FRECKLES_DESCRIPTION.ageClass,
  color: FRECKLES_DESCRIPTION.color,
  hornColor: FRECKLES_DESCRIPTION.hornColor,
  eyeColor: FRECKLES_DESCRIPTION.eyeColor,
  description: FRECKLES_DESCRIPTION.text,
  cameoOrigin: FRECKLES_DESCRIPTION.cameoOrigin,
  dimensions: FRECKLES_DIMENSIONS,
  audio: FRECKLES_AUDIO_PARAMS,
  gait: FRECKLES_GAIT_FREQUENCIES,
  palette: FRECKLES_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: FRECKLES_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: FRECKLES_MOVEMENTS.socialChatterRate,
    rampAgility: FRECKLES_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
