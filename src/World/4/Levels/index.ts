/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel } from "../../../types";

export const World4LevelPlaceIds = [
  // Round 1 (Levels 1-5)
  "desert",
  "forest",
  "plain",
  "mountains",
  "wilderness_cave_limestone_grotto",
  // Round 2 (Levels 6-10)
  "desert_obsidian_erg",
  "forest_old_growth_redwood",
  "plain_tallgrass_prairie",
  "mountains_glacial_ice_ridge",
  "wilderness_cave_granite_rift",
  // Round 3 (Levels 11-15)
  "desert_salt_pan_basin",
  "forest_pine_needle_ridge",
  "plain_sagebrush_steppe",
  "mountains_basalt_volcanic_crest",
  "wilderness_cave_glacial_ice_vault",
  // Round 4 (Levels 16-20)
  "desert_red_sandstone_mesa",
  "forest_mossy_temperate_rainforest",
  "plain_golden_savannah",
  "mountains_alpine_snow_saddle",
  "wilderness_cave_lava_tube",
  // Round 5 (Levels 21-25)
  "desert_oasis_palm_wadi",
  "forest_autumn_maple_hollow",
  "plain_wildflower_meadow",
  "mountains_slate_switchback_pass",
  "wilderness_cave_marble_cathedral",
  // Round 6 (Levels 26-30)
  "desert_quartz_singing_dunes",
  "forest_boreal_spruce_taiga",
  "plain_coastal_moorland",
  "mountains_limestone_karst_crag",
  "wilderness_cave_slate_fissure",
  // Round 7 (Levels 31-35)
  "desert_chalk_badlands",
  "forest_bamboo_mist_grove",
  "plain_windswept_tundra",
  "mountains_timberline_meadow_spur",
  "wilderness_cave_alluvial_gravel",
  // Round 8 (Levels 36-40)
  "desert_canyon_arroyo",
  "forest_cypress_bayou_trail",
  "plain_pampas_floodplain",
  "mountains_cloud_gorge_ledge",
  "wilderness_cave_echosilt_hollow"
] as const;

const WORLD4_ENTRIES: Array<{ id: string; name: string; hue: number }> = [
  { id: "desert", name: "The Crimson Saharan Dunes", hue: 32 },
  { id: "forest", name: "The Whispering Birch Forest", hue: 138 },
  { id: "plain", name: "The Whispering Switchgrass Fields", hue: 82 },
  { id: "mountains", name: "The Rugged Granite Scree Peak", hue: 215 },
  { id: "wilderness_cave_limestone_grotto", name: "Limestone Dripstone Grotto", hue: 195 },

  { id: "desert_obsidian_erg", name: "The Obsidian Sand Erg", hue: 24 },
  { id: "forest_old_growth_redwood", name: "Old-Growth Redwood Cathedral", hue: 125 },
  { id: "plain_tallgrass_prairie", name: "Golden Tallgrass Prairie", hue: 68 },
  { id: "mountains_glacial_ice_ridge", name: "Glacial Blue-Ice Ridge", hue: 198 },
  { id: "wilderness_cave_granite_rift", name: "Granite Fault-Line Cavern", hue: 225 },

  { id: "desert_salt_pan_basin", name: "Sun-Baked Salt Pan Basin", hue: 46 },
  { id: "forest_pine_needle_ridge", name: "High Pine Needle Ridge", hue: 148 },
  { id: "plain_sagebrush_steppe", name: "Highland Sagebrush Steppe", hue: 96 },
  { id: "mountains_basalt_volcanic_crest", name: "Basalt Volcanic Crest", hue: 14 },
  { id: "wilderness_cave_glacial_ice_vault", name: "Glacial Ice-Sheet Cavern", hue: 190 },

  { id: "desert_red_sandstone_mesa", name: "Red Sandstone Mesa Trail", hue: 18 },
  { id: "forest_mossy_temperate_rainforest", name: "Mossy Temperate Rainforest", hue: 152 },
  { id: "plain_golden_savannah", name: "Acacia Golden Savannah", hue: 48 },
  { id: "mountains_alpine_snow_saddle", name: "Alpine Wind-Packed Snow Saddle", hue: 205 },
  { id: "wilderness_cave_lava_tube", name: "Dormant Basalt Lava Tube", hue: 10 },

  { id: "desert_oasis_palm_wadi", name: "Oasis Palm-Silt Wadi", hue: 55 },
  { id: "forest_autumn_maple_hollow", name: "Autumn Maple Leaf Hollow", hue: 28 },
  { id: "plain_wildflower_meadow", name: "Alpine Wildflower Meadow", hue: 310 },
  { id: "mountains_slate_switchback_pass", name: "Weathered Slate Switchback Pass", hue: 220 },
  { id: "wilderness_cave_marble_cathedral", name: "Karst Marble Cathedral", hue: 265 },

  { id: "desert_quartz_singing_dunes", name: "Quartz Singing Dunes", hue: 40 },
  { id: "forest_boreal_spruce_taiga", name: "Boreal Spruce & Lichen Taiga", hue: 162 },
  { id: "plain_coastal_moorland", name: "Heather Coastal Moorland", hue: 275 },
  { id: "mountains_limestone_karst_crag", name: "Limestone Karst Ridge Crag", hue: 185 },
  { id: "wilderness_cave_slate_fissure", name: "Dark Slate Echo Fissure", hue: 235 },

  { id: "desert_chalk_badlands", name: "Eroded Chalk Badlands", hue: 36 },
  { id: "forest_bamboo_mist_grove", name: "Highland Bamboo Mist Grove", hue: 118 },
  { id: "plain_windswept_tundra", name: "Windswept Permafrost Tundra", hue: 178 },
  { id: "mountains_timberline_meadow_spur", name: "Timberline Lichen Spur", hue: 102 },
  { id: "wilderness_cave_alluvial_gravel", name: "Subterranean River Bed Cavern", hue: 175 },

  { id: "desert_canyon_arroyo", name: "Dry Canyon Arroyo Wash", hue: 22 },
  { id: "forest_cypress_bayou_trail", name: "Cypress Knee Bayou Trail", hue: 142 },
  { id: "plain_pampas_floodplain", name: "Pampas Feather-Grass Floodplain", hue: 76 },
  { id: "mountains_cloud_gorge_ledge", name: "Mist-Veiled Cloud Gorge Ledge", hue: 210 },
  { id: "wilderness_cave_echosilt_hollow", name: "Echo-Silt Limestone Hollow", hue: 250 }
];

export function generateWorld4Level(levelId: number): GameLevel {
  const safeId = Math.max(1, levelId);
  const index = (safeId - 1) % WORLD4_ENTRIES.length;
  const round = Math.floor((safeId - 1) / 5) + 1;
  const selected = WORLD4_ENTRIES[index];

  return {
    id: safeId,
    name: `${selected.name} (Wilderness Round ${round} - Level ${safeId})`,
    placeId: selected.id,
    targetDistance: Math.floor((1400 + safeId * 180) * 0.7),
    tickDensity: Math.min(24, 8 + (safeId % 9)),
    opponentFrequency: Math.min(5.5, 1.2 + (safeId * 0.1)),
    colorHue: selected.hue
  };
}

export default generateWorld4Level;

export * from "./Index";
