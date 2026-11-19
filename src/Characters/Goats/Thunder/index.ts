/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { THUNDER_DESCRIPTION } from "./Description";
import { THUNDER_DIMENSIONS } from "./Dimensions";
import { THUNDER_AUDIO_PARAMS, THUNDER_GAIT_FREQUENCIES, THUNDER_PALETTE } from "./Animations";
import { THUNDER_MOVEMENTS } from "./Movements";

export const THUNDER_CAMEO: GoatCameoProfile = {
  id: THUNDER_DESCRIPTION.id,
  name: THUNDER_DESCRIPTION.name,
  gender: THUNDER_DESCRIPTION.gender,
  ageClass: THUNDER_DESCRIPTION.ageClass,
  color: THUNDER_DESCRIPTION.color,
  hornColor: THUNDER_DESCRIPTION.hornColor,
  eyeColor: THUNDER_DESCRIPTION.eyeColor,
  description: THUNDER_DESCRIPTION.text,
  cameoOrigin: THUNDER_DESCRIPTION.cameoOrigin,
  dimensions: THUNDER_DIMENSIONS,
  audio: THUNDER_AUDIO_PARAMS,
  gait: THUNDER_GAIT_FREQUENCIES,
  palette: THUNDER_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: THUNDER_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: THUNDER_MOVEMENTS.socialChatterRate,
    rampAgility: THUNDER_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
