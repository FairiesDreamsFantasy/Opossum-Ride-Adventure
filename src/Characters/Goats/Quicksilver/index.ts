/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { QUICKSILVER_DESCRIPTION } from "./Description";
import { QUICKSILVER_DIMENSIONS } from "./Dimensions";
import { QUICKSILVER_AUDIO_PARAMS, QUICKSILVER_GAIT_FREQUENCIES, QUICKSILVER_PALETTE } from "./Animations";
import { QUICKSILVER_MOVEMENTS } from "./Movements";

export const QUICKSILVER_CAMEO: GoatCameoProfile = {
  id: QUICKSILVER_DESCRIPTION.id,
  name: QUICKSILVER_DESCRIPTION.name,
  gender: QUICKSILVER_DESCRIPTION.gender,
  ageClass: QUICKSILVER_DESCRIPTION.ageClass,
  color: QUICKSILVER_DESCRIPTION.color,
  hornColor: QUICKSILVER_DESCRIPTION.hornColor,
  eyeColor: QUICKSILVER_DESCRIPTION.eyeColor,
  description: QUICKSILVER_DESCRIPTION.text,
  cameoOrigin: QUICKSILVER_DESCRIPTION.cameoOrigin,
  dimensions: QUICKSILVER_DIMENSIONS,
  audio: QUICKSILVER_AUDIO_PARAMS,
  gait: QUICKSILVER_GAIT_FREQUENCIES,
  palette: QUICKSILVER_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: QUICKSILVER_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: QUICKSILVER_MOVEMENTS.socialChatterRate,
    rampAgility: QUICKSILVER_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
