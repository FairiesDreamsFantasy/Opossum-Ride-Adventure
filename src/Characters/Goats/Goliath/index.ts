/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { GOLIATH_DESCRIPTION } from "./Description";
import { GOLIATH_DIMENSIONS } from "./Dimensions";
import { GOLIATH_AUDIO_PARAMS, GOLIATH_GAIT_FREQUENCIES, GOLIATH_PALETTE } from "./Animations";
import { GOLIATH_MOVEMENTS } from "./Movements";

export const GOLIATH_CAMEO: GoatCameoProfile = {
  id: GOLIATH_DESCRIPTION.id,
  name: GOLIATH_DESCRIPTION.name,
  gender: GOLIATH_DESCRIPTION.gender,
  ageClass: GOLIATH_DESCRIPTION.ageClass,
  color: GOLIATH_DESCRIPTION.color,
  hornColor: GOLIATH_DESCRIPTION.hornColor,
  eyeColor: GOLIATH_DESCRIPTION.eyeColor,
  description: GOLIATH_DESCRIPTION.text,
  cameoOrigin: GOLIATH_DESCRIPTION.cameoOrigin,
  dimensions: GOLIATH_DIMENSIONS,
  audio: GOLIATH_AUDIO_PARAMS,
  gait: GOLIATH_GAIT_FREQUENCIES,
  palette: GOLIATH_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: GOLIATH_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: GOLIATH_MOVEMENTS.socialChatterRate,
    rampAgility: GOLIATH_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
