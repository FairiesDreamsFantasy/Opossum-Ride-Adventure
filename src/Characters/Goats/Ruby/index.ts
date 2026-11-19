/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { RUBY_DESCRIPTION } from "./Description";
import { RUBY_DIMENSIONS } from "./Dimensions";
import { RUBY_AUDIO_PARAMS, RUBY_GAIT_FREQUENCIES, RUBY_PALETTE } from "./Animations";
import { RUBY_MOVEMENTS } from "./Movements";

export const RUBY_CAMEO: GoatCameoProfile = {
  id: RUBY_DESCRIPTION.id,
  name: RUBY_DESCRIPTION.name,
  gender: RUBY_DESCRIPTION.gender,
  ageClass: RUBY_DESCRIPTION.ageClass,
  color: RUBY_DESCRIPTION.color,
  hornColor: RUBY_DESCRIPTION.hornColor,
  eyeColor: RUBY_DESCRIPTION.eyeColor,
  description: RUBY_DESCRIPTION.text,
  cameoOrigin: RUBY_DESCRIPTION.cameoOrigin,
  dimensions: RUBY_DIMENSIONS,
  audio: RUBY_AUDIO_PARAMS,
  gait: RUBY_GAIT_FREQUENCIES,
  palette: RUBY_PALETTE,
  grazePreference: {
    grazeFrequencyMultiplier: RUBY_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: RUBY_MOVEMENTS.socialChatterRate,
    rampAgility: RUBY_MOVEMENTS.rampAgility
  }
};

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
