/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
export * from "./Generic";
export * from "./types";

import { SNOWY_CAMEO } from "./Snowy";
import { THUNDER_CAMEO } from "./Thunder";
import { SHADOW_CAMEO } from "./Shadow";
import { BELLA_CAMEO } from "./Bella";
import { GOLIATH_CAMEO } from "./Goliath";
import { FRECKLES_CAMEO } from "./Freckles";
import { OBSIDIAN_CAMEO } from "./Obsidian";
import { GINGER_CAMEO } from "./Ginger";
import { QUICKSILVER_CAMEO } from "./Quicksilver";
import { PATCHES_CAMEO } from "./Patches";
import { DUSTY_CAMEO } from "./Dusty";
import { LUNA_CAMEO } from "./Luna";
import { AURUM_CAMEO } from "./Aurum";
import { ALPINE_CAMEO } from "./Alpine";
import { WILLOW_CAMEO } from "./Willow";
import { RUBY_CAMEO } from "./Ruby";
import { GOAT_KIDS } from "./Kids";
import { GoatCameoProfile } from "./types";

export {
  SNOWY_CAMEO,
  THUNDER_CAMEO,
  SHADOW_CAMEO,
  BELLA_CAMEO,
  GOLIATH_CAMEO,
  FRECKLES_CAMEO,
  OBSIDIAN_CAMEO,
  GINGER_CAMEO,
  QUICKSILVER_CAMEO,
  PATCHES_CAMEO,
  DUSTY_CAMEO,
  LUNA_CAMEO,
  AURUM_CAMEO,
  ALPINE_CAMEO,
  WILLOW_CAMEO,
  RUBY_CAMEO,
  GOAT_KIDS
};

export const CORE_GOAT_CAMEOS: GoatCameoProfile[] = [
  SNOWY_CAMEO,
  THUNDER_CAMEO,
  SHADOW_CAMEO,
  BELLA_CAMEO,
  GOLIATH_CAMEO,
  FRECKLES_CAMEO,
  OBSIDIAN_CAMEO,
  GINGER_CAMEO,
  QUICKSILVER_CAMEO,
  PATCHES_CAMEO,
  DUSTY_CAMEO,
  LUNA_CAMEO,
  AURUM_CAMEO,
  ALPINE_CAMEO,
  WILLOW_CAMEO,
  RUBY_CAMEO
];

export const ALL_CAPRINE_CAMEOS: GoatCameoProfile[] = [
  ...CORE_GOAT_CAMEOS,
  ...GOAT_KIDS
];

export const CORE_GOAT_CAMEOS_BY_ID: Record<string, GoatCameoProfile> = Object.fromEntries(
  ALL_CAPRINE_CAMEOS.map((goat) => [goat.id, goat])
);

export function getGoatCameoById(id?: string): GoatCameoProfile {
  if (id && CORE_GOAT_CAMEOS_BY_ID[id]) {
    return CORE_GOAT_CAMEOS_BY_ID[id];
  }
  return SNOWY_CAMEO;
}

export * from "./CameoRenderer";
