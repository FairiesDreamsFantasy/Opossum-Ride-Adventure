/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoProfile } from "../types";
import { GOAT_KID_DESCRIPTIONS } from "./Description";
import { GOAT_KID_DIMENSIONS } from "./Dimensions";
import { GOAT_KID_AUDIO_PARAMS, GOAT_KID_GAIT_FREQUENCIES, GOAT_KID_PALETTES } from "./Animations";
import { GOAT_KID_MOVEMENTS } from "./Movements";

export interface GoatKidCameoProfile extends GoatCameoProfile {
  companionAdultId: string;
}

export const GOAT_KIDS: GoatKidCameoProfile[] = GOAT_KID_DESCRIPTIONS.map((desc) => ({
  id: desc.id,
  name: desc.name,
  gender: desc.gender,
  ageClass: "kid",
  color: desc.color,
  hornColor: desc.hornColor,
  eyeColor: desc.eyeColor,
  description: desc.text,
  cameoOrigin: desc.cameoOrigin,
  companionAdultId: desc.companionAdultId,
  dimensions: GOAT_KID_DIMENSIONS,
  audio: GOAT_KID_AUDIO_PARAMS[desc.id],
  gait: GOAT_KID_GAIT_FREQUENCIES,
  palette: GOAT_KID_PALETTES[desc.id],
  grazePreference: {
    grazeFrequencyMultiplier: GOAT_KID_MOVEMENTS.grazeFrequencyMultiplier,
    socialChatterRate: GOAT_KID_MOVEMENTS.socialChatterRate,
    rampAgility: GOAT_KID_MOVEMENTS.rampAgility
  }
}));

export * from "./Description";
export * from "./Dimensions";
export * from "./Animations";
export * from "./Movements";
