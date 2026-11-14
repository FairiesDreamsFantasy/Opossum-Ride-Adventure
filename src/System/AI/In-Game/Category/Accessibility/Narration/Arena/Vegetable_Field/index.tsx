/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";
import { PlaceResolver } from "../../../../../../../Engine/Resolver";

export const VEGETABLE_FIELD_PLACE_IDS = [
  "vegetable_field",
  "carrot_field",
  "potato_field",
  "tomato_field",
  "cabbage_field",
  "onion_field",
  "broccoli_field",
  "squash_field",
  "spinach_field",
  "bell_pepper_field"
] as const;

export function isVegetableFieldPlaceId(placeId: string): boolean {
  if (!placeId) return false;
  const normalized = placeId.trim().toLowerCase();
  return (VEGETABLE_FIELD_PLACE_IDS as readonly string[]).includes(normalized) || normalized.includes("vegetable_field");
}

const SUBARENA_PROFILES: Record<string, { name: string; acoustic: string; description: string }> = {
  carrot_field: {
    name: "The Carrot Field",
    acoustic: "feathery carrot foliage rustling in warm meadow breezes with gentle solar weeding bot hum",
    description: "Tidy sandy-loam ridges of bright emerald carrot tops tended by autonomous solar agricultural robotics."
  },
  potato_field: {
    name: "The Potato Field",
    acoustic: "bushy potato foliage rustling across shaded soil ridges with subtle moisture sensor drones",
    description: "Dark emerald flowering potato beds cultivated ethically with solar irrigation technology."
  },
  tomato_field: {
    name: "The Tomato Field",
    acoustic: "heirloom tomato trellises whispering with honeybees and soft solar mist spray",
    description: "Rows of crimson and golden heirloom tomatoes cared for by autonomous solar harvesters and dignified stewards."
  },
  cabbage_field: {
    name: "The Cabbage Field",
    acoustic: "broad crisp cabbage leaves rustling in cool farmland breezes",
    description: "Rhythmic rows of blue-green and ruby cabbages nourished by solar drip irrigation booms."
  },
  onion_field: {
    name: "The Onion Field",
    acoustic: "hollow tubular onion shoots whistling softly in open crosswinds",
    description: "Crisp ridges of silver, yellow, and red onions monitored cleanly by solar soil sensors."
  },
  broccoli_field: {
    name: "The Broccoli Field",
    acoustic: "leafy broccoli crowns rustling under crisp farmland wind and gentle drip-boom mist",
    description: "Deep jade broccoli beds hydrated by autonomous solar irrigation systems."
  },
  squash_field: {
    name: "The Squash Field",
    acoustic: "broad velvety squash leaves rustling around golden trumpet blossoms",
    description: "Sunlit golden squash rows tended gently by autonomous solar pollination rovers."
  },
  spinach_field: {
    name: "The Spinach Field",
    acoustic: "tender deep-green spinach leaves fluttering softly in cool breezes",
    description: "Nutrient-rich emerald spinach beds cooled by solar micro-sprinklers."
  },
  bell_pepper_field: {
    name: "The Bell Pepper Field",
    acoustic: "crisp bell pepper foliage rustling beside calm solar ripeness scanners",
    description: "Glossy red, yellow, and green bell pepper bushes tended ethically with autonomous solar technology."
  }
};

export const VegetableFieldArenaNarration = {
  arenaId: "vegetable_field",
  arenaName: "Vegetable Fields",
  subarenas: SUBARENA_PROFILES,

  compileScene: (ctx: SceneNarrationContext): string => {
    const key = (ctx.placeId || "").trim().toLowerCase();
    const sub = SUBARENA_PROFILES[key];
    const resolvedPlace = PlaceResolver.resolvePlace(ctx.placeId, ctx.levelName);

    const name = ctx.levelName || sub?.name || resolvedPlace.name || "Vegetable Fields";
    const substrate = ctx.surfaceType || resolvedPlace.surfaceType || "flat triangular slate stone blocks";
    const acoustic = sub?.acoustic || resolvedPlace.ambientNoise || "leafy vegetable foliage rustling in farmland breezes";
    const description = ctx.longDescription || sub?.description || resolvedPlace.longDescription || resolvedPlace.description || "";

    return `You are currently at ${name}, connected beyond the grain Crop Fields. Path surface uses ${substrate}, delivering crisp 1650 Hz Slate acoustic footsteps, bordered by 12-inch Red, Gold, and Green triangular divider stones and stacked Triangular Stone Fences spaced 500 to 2,000 meters apart. Ambient sound features ${acoustic}. ${description}`;
  },

  compilePosition: (formattedDistance: string, activeName: string, segmentDirection: string): string => {
    return `You are at ${formattedDistance} of ${activeName} along the ground-oriented 36-color triangular slate stone vegetable field path, facing ${segmentDirection.toLowerCase()}.`;
  }
};

export default VegetableFieldArenaNarration;
