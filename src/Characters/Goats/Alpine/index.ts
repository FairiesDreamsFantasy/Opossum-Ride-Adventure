/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { ALPINE_DESCRIPTION } from "./Description";
import { ALPINE_DIMENSIONS } from "./Dimensions";
import { ALPINE_AUDIO_PARAMS, ALPINE_GAIT_FREQUENCIES, ALPINE_PALETTE } from "./Animations";
import { ALPINE_MOVEMENTS } from "./Movements";

export const ALPINE_CAMEO: GoatCameoProfile = {
  id: ALPINE_DESCRIPTION.id,
  name: ALPINE_DESCRIPTION.name,
  gender: ALPINE_DESCRIPTION.gender,
  ageClass: ALPINE_DESCRIPTION.ageClass,
  color: ALPINE_DESCRIPTION.color,
  hornColor: ALPINE_DESCRIPTION.hornColor,
  eyeColor: ALPINE_DESCRIPTION.eyeColor,
  description: ALPINE_DESCRIPTION.text,
  cameoOrigin: ALPINE_DESCRIPTION.cameoOrigin,
  dimensions: ALPINE_DIMENSIONS,
  audio: ALPINE_AUDIO_PARAMS,
  gait: ALPINE_GAIT_FREQUENCIES,
  palette: ALPINE_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: ALPINE_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: ALPINE_MOVEMENTS.socialChatterRate,
    rampAgility: ALPINE_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
