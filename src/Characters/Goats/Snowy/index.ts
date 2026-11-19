/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { SNOWY_DESCRIPTION } from "./Description";
import { SNOWY_DIMENSIONS } from "./Dimensions";
import { SNOWY_AUDIO_PARAMS, SNOWY_GAIT_FREQUENCIES, SNOWY_PALETTE } from "./Animations";
import { SNOWY_MOVEMENTS } from "./Movements";

export const SNOWY_CAMEO: GoatCameoProfile = {
  id: SNOWY_DESCRIPTION.id,
  name: SNOWY_DESCRIPTION.name,
  gender: SNOWY_DESCRIPTION.gender,
  ageClass: SNOWY_DESCRIPTION.ageClass,
  color: SNOWY_DESCRIPTION.color,
  hornColor: SNOWY_DESCRIPTION.hornColor,
  eyeColor: SNOWY_DESCRIPTION.eyeColor,
  description: SNOWY_DESCRIPTION.text,
  cameoOrigin: SNOWY_DESCRIPTION.cameoOrigin,
  dimensions: SNOWY_DIMENSIONS,
  audio: SNOWY_AUDIO_PARAMS,
  gait: SNOWY_GAIT_FREQUENCIES,
  palette: SNOWY_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: SNOWY_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: SNOWY_MOVEMENTS.socialChatterRate,
    rampAgility: SNOWY_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
