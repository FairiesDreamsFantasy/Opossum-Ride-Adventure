/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { AURUM_DESCRIPTION } from "./Description";
import { AURUM_DIMENSIONS } from "./Dimensions";
import { AURUM_AUDIO_PARAMS, AURUM_GAIT_FREQUENCIES, AURUM_PALETTE } from "./Animations";
import { AURUM_MOVEMENTS } from "./Movements";

export const AURUM_CAMEO: GoatCameoProfile = {
  id: AURUM_DESCRIPTION.id,
  name: AURUM_DESCRIPTION.name,
  gender: AURUM_DESCRIPTION.gender,
  ageClass: AURUM_DESCRIPTION.ageClass,
  color: AURUM_DESCRIPTION.color,
  hornColor: AURUM_DESCRIPTION.hornColor,
  eyeColor: AURUM_DESCRIPTION.eyeColor,
  description: AURUM_DESCRIPTION.text,
  cameoOrigin: AURUM_DESCRIPTION.cameoOrigin,
  dimensions: AURUM_DIMENSIONS,
  audio: AURUM_AUDIO_PARAMS,
  gait: AURUM_GAIT_FREQUENCIES,
  palette: AURUM_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: AURUM_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: AURUM_MOVEMENTS.socialChatterRate,
    rampAgility: AURUM_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
