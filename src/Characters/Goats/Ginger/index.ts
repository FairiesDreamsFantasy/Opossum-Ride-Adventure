/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { GINGER_DESCRIPTION } from "./Description";
import { GINGER_DIMENSIONS } from "./Dimensions";
import { GINGER_AUDIO_PARAMS, GINGER_GAIT_FREQUENCIES, GINGER_PALETTE } from "./Animations";
import { GINGER_MOVEMENTS } from "./Movements";

export const GINGER_CAMEO: GoatCameoProfile = {
  id: GINGER_DESCRIPTION.id,
  name: GINGER_DESCRIPTION.name,
  gender: GINGER_DESCRIPTION.gender,
  ageClass: GINGER_DESCRIPTION.ageClass,
  color: GINGER_DESCRIPTION.color,
  hornColor: GINGER_DESCRIPTION.hornColor,
  eyeColor: GINGER_DESCRIPTION.eyeColor,
  description: GINGER_DESCRIPTION.text,
  cameoOrigin: GINGER_DESCRIPTION.cameoOrigin,
  dimensions: GINGER_DIMENSIONS,
  audio: GINGER_AUDIO_PARAMS,
  gait: GINGER_GAIT_FREQUENCIES,
  palette: GINGER_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: GINGER_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: GINGER_MOVEMENTS.socialChatterRate,
    rampAgility: GINGER_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
