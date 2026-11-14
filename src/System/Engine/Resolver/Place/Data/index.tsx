/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { INITIAL_PLACES, PlaceDefinition } from "../../../../../Arena";

export interface PlaceSoundProfile {
  bgmCategory: "meditation" | "orchard" | "farm" | "cave" | "manor" | "outdoor" | "synthetic_ai";
  ambientType:
    | "breeze"
    | "greenhouse"
    | "reverb"
    | "cavern"
    | "rural"
    | "crop_rustle"
    | "desert_wind"
    | "grassland_wind"
    | "forest_canopy"
    | "alpine_wind"
    | "wilderness_cavern"
    | "synthetic";
  hasDedicatedBGMTrack: boolean;
  dedicatedTrackName?: string;
}

/**
 * Registry of all known handcrafted and sub-arena place definitions.
 * Prevents arbitrary fallback to garden across the entire game engine.
 */
export const MasterPlaceRegistry: Record<string, PlaceDefinition> = {
  ...INITIAL_PLACES,
};

/**
 * Sound profile bindings for every registered place ID.
 */
export const PlaceSoundProfileMap: Record<string, PlaceSoundProfile> = {
  // Meditation & Sanctuaries
  garden: { bgmCategory: "meditation", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Garden_Of_Wisdom" },
  zen_stone_garden: { bgmCategory: "meditation", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Zen_Stone_Garden" },
  botanical_maze: { bgmCategory: "meditation", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Botanical_Maze" },
  butterfly_sanctuary: { bgmCategory: "meditation", ambientType: "greenhouse", hasDedicatedBGMTrack: true, dedicatedTrackName: "Butterfly_Sanctuary" },
  orchid_glasshouse: { bgmCategory: "meditation", ambientType: "greenhouse", hasDedicatedBGMTrack: true, dedicatedTrackName: "Orchid_Glasshouse" },
  edible_berry_garden: { bgmCategory: "meditation", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Edible_Berry_Garden" },

  // Orchards & Groves
  the_grand_orchard: { bgmCategory: "orchard", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "The_Grand_Orchard" },
  cherry_orchard: { bgmCategory: "orchard", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Cherry_Orchard" },
  almond_grove: { bgmCategory: "orchard", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Almond_Grove" },
  apple_grove: { bgmCategory: "orchard", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Apple_Grove" },
  olive_grove: { bgmCategory: "orchard", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Olive_Grove" },
  walnut_grove: { bgmCategory: "orchard", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Walnut_Grove" },

  // Farms
  farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Farm" },
  chicken_farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Chicken_Farm" },
  goat_farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Goat_Farm" },
  sheep_farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Sheep_Farm" },
  duck_farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Duck_Farm" },
  goose_farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Goose_Farm" },
  horse_farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Horse_Farm" },
  cattle_farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Cattle_Farm" },

  // Crop Fields (12)
  crop_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Crop_Field" },
  wheat_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Wheat_Field" },
  corn_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Corn_Field" },
  barley_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Barley_Field" },
  rice_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Rice_Field" },
  oats_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Oats_Field" },
  sorghum_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Sorghum_Field" },
  rye_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Rye_Field" },
  millet_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Millet_Field" },
  buckwheat_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Buckwheat_Field" },
  quinoa_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Quinoa_Field" },
  amaranth_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Amaranth_Field" },
  spelt_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Spelt_Field" },

  // Vegetable Fields (Parent + 9)
  vegetable_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Vegetable_Field" },
  carrot_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Carrot_Field" },
  potato_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Potato_Field" },
  tomato_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Tomato_Field" },
  cabbage_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Cabbage_Field" },
  onion_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Onion_Field" },
  broccoli_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Broccoli_Field" },
  squash_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Squash_Field" },
  spinach_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Spinach_Field" },
  bell_pepper_field: { bgmCategory: "farm", ambientType: "crop_rustle", hasDedicatedBGMTrack: true, dedicatedTrackName: "Bell_Pepper_Field" },

  // Indoor / Manor
  floor_foyer: { bgmCategory: "manor", ambientType: "reverb", hasDedicatedBGMTrack: true, dedicatedTrackName: "Floor_Foyer" },
  stone_corridor: { bgmCategory: "manor", ambientType: "reverb", hasDedicatedBGMTrack: true, dedicatedTrackName: "Stone_Corridor" },
  stone_room: { bgmCategory: "manor", ambientType: "reverb", hasDedicatedBGMTrack: true, dedicatedTrackName: "Stone_Room" },
  generic: { bgmCategory: "manor", ambientType: "reverb", hasDedicatedBGMTrack: true, dedicatedTrackName: "Cozy_Library_Lounge" },

  // Caves & Mines (World 3)
  cave: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Cave" },
  gold_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Gold_Mine" },
  silver_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Silver_Mine" },
  emerald_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Emerald_Mine" },
  diamond_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Diamond_Mine" },
  salt_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Salt_Mine" },
  simulated_gold_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Simulated_Gold_Mine" },
  simulated_silver_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Simulated_Silver_Mine" },
  simulated_emerald_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Simulated_Emerald_Mine" },
  simulated_diamond_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Simulated_Diamond_Mine" },
  simulated_salt_mine: { bgmCategory: "cave", ambientType: "cavern", hasDedicatedBGMTrack: true, dedicatedTrackName: "Simulated_Salt_Mine" },

  // Wilderness Desert (8)
  desert: { bgmCategory: "outdoor", ambientType: "desert_wind", hasDedicatedBGMTrack: false },
  desert_obsidian_erg: { bgmCategory: "outdoor", ambientType: "desert_wind", hasDedicatedBGMTrack: false },
  desert_salt_pan_basin: { bgmCategory: "outdoor", ambientType: "desert_wind", hasDedicatedBGMTrack: false },
  desert_red_sandstone_mesa: { bgmCategory: "outdoor", ambientType: "desert_wind", hasDedicatedBGMTrack: false },
  desert_oasis_palm_wadi: { bgmCategory: "outdoor", ambientType: "desert_wind", hasDedicatedBGMTrack: false },
  desert_quartz_singing_dunes: { bgmCategory: "outdoor", ambientType: "desert_wind", hasDedicatedBGMTrack: false },
  desert_chalk_badlands: { bgmCategory: "outdoor", ambientType: "desert_wind", hasDedicatedBGMTrack: false },
  desert_canyon_arroyo: { bgmCategory: "outdoor", ambientType: "desert_wind", hasDedicatedBGMTrack: false },

  // Wilderness Forest (8)
  forest: { bgmCategory: "outdoor", ambientType: "forest_canopy", hasDedicatedBGMTrack: false },
  forest_old_growth_redwood: { bgmCategory: "outdoor", ambientType: "forest_canopy", hasDedicatedBGMTrack: false },
  forest_pine_needle_ridge: { bgmCategory: "outdoor", ambientType: "forest_canopy", hasDedicatedBGMTrack: false },
  forest_mossy_temperate_rainforest: { bgmCategory: "outdoor", ambientType: "forest_canopy", hasDedicatedBGMTrack: false },
  forest_autumn_maple_hollow: { bgmCategory: "outdoor", ambientType: "forest_canopy", hasDedicatedBGMTrack: false },
  forest_boreal_spruce_taiga: { bgmCategory: "outdoor", ambientType: "forest_canopy", hasDedicatedBGMTrack: false },
  forest_bamboo_mist_grove: { bgmCategory: "outdoor", ambientType: "forest_canopy", hasDedicatedBGMTrack: false },
  forest_cypress_bayou_trail: { bgmCategory: "outdoor", ambientType: "forest_canopy", hasDedicatedBGMTrack: false },

  // Wilderness Plain (8)
  plain: { bgmCategory: "outdoor", ambientType: "grassland_wind", hasDedicatedBGMTrack: false },
  plain_tallgrass_prairie: { bgmCategory: "outdoor", ambientType: "grassland_wind", hasDedicatedBGMTrack: false },
  plain_sagebrush_steppe: { bgmCategory: "outdoor", ambientType: "grassland_wind", hasDedicatedBGMTrack: false },
  plain_golden_savannah: { bgmCategory: "outdoor", ambientType: "grassland_wind", hasDedicatedBGMTrack: false },
  plain_wildflower_meadow: { bgmCategory: "outdoor", ambientType: "grassland_wind", hasDedicatedBGMTrack: false },
  plain_coastal_moorland: { bgmCategory: "outdoor", ambientType: "grassland_wind", hasDedicatedBGMTrack: false },
  plain_windswept_tundra: { bgmCategory: "outdoor", ambientType: "grassland_wind", hasDedicatedBGMTrack: false },
  plain_pampas_floodplain: { bgmCategory: "outdoor", ambientType: "grassland_wind", hasDedicatedBGMTrack: false },

  // Wilderness Mountains (8)
  mountains: { bgmCategory: "outdoor", ambientType: "alpine_wind", hasDedicatedBGMTrack: false },
  mountains_glacial_ice_ridge: { bgmCategory: "outdoor", ambientType: "alpine_wind", hasDedicatedBGMTrack: false },
  mountains_basalt_volcanic_crest: { bgmCategory: "outdoor", ambientType: "alpine_wind", hasDedicatedBGMTrack: false },
  mountains_alpine_snow_saddle: { bgmCategory: "outdoor", ambientType: "alpine_wind", hasDedicatedBGMTrack: false },
  mountains_slate_switchback_pass: { bgmCategory: "outdoor", ambientType: "alpine_wind", hasDedicatedBGMTrack: false },
  mountains_limestone_karst_crag: { bgmCategory: "outdoor", ambientType: "alpine_wind", hasDedicatedBGMTrack: false },
  mountains_timberline_meadow_spur: { bgmCategory: "outdoor", ambientType: "alpine_wind", hasDedicatedBGMTrack: false },
  mountains_cloud_gorge_ledge: { bgmCategory: "outdoor", ambientType: "alpine_wind", hasDedicatedBGMTrack: false },

  // Natural Wilderness Caves (8)
  wilderness_cave_limestone_grotto: { bgmCategory: "cave", ambientType: "wilderness_cavern", hasDedicatedBGMTrack: false },
  wilderness_cave_granite_rift: { bgmCategory: "cave", ambientType: "wilderness_cavern", hasDedicatedBGMTrack: false },
  wilderness_cave_glacial_ice_vault: { bgmCategory: "cave", ambientType: "wilderness_cavern", hasDedicatedBGMTrack: false },
  wilderness_cave_lava_tube: { bgmCategory: "cave", ambientType: "wilderness_cavern", hasDedicatedBGMTrack: false },
  wilderness_cave_marble_cathedral: { bgmCategory: "cave", ambientType: "wilderness_cavern", hasDedicatedBGMTrack: false },
  wilderness_cave_slate_fissure: { bgmCategory: "cave", ambientType: "wilderness_cavern", hasDedicatedBGMTrack: false },
  wilderness_cave_alluvial_gravel: { bgmCategory: "cave", ambientType: "wilderness_cavern", hasDedicatedBGMTrack: false },
  wilderness_cave_echosilt_hollow: { bgmCategory: "cave", ambientType: "wilderness_cavern", hasDedicatedBGMTrack: false },

  // Other Outdoor Arenas
  quarry: { bgmCategory: "outdoor", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Quarry" },
  city: { bgmCategory: "outdoor", ambientType: "reverb", hasDedicatedBGMTrack: true, dedicatedTrackName: "City" },
};

/**
 * Creates an ultra-meaningful dynamic PlaceDefinition for AI-generated levels (ai_gen_*)
 * so that AI-generated levels never fall back to "garden".
 */
export function createAIGeneratedPlaceDefinition(placeId: string, customName?: string): PlaceDefinition {
  const normalized = placeId.toLowerCase().replace(/^ai_gen_/, "").replace(/_/g, " ");
  const formattedName = customName || normalized.replace(/\b\w/g, (char) => char.toUpperCase());
  const displayName = customName ? customName : `${formattedName}`;

  return {
    id: placeId,
    name: displayName,
    description: `A scientifically simulated natural arena featuring ${formattedName}. Characterized by specialized geological substrates, dynamic kinetic friction coefficient \u03bc_k \u2248 0.72, and Sabine acoustic reverberation decay RT60 modeling.`,
    surfaceType: "geologically structured mineral substrate with calibrated kinetic friction",
    footstepSound: "acoustic substrate impact absorption",
    colorBase: "#0284c7",
    ambientNoise: "atmospheric wind flow and natural microclimate acoustic resonance",
    longDescription: `An ultra-scientific procedurally synthesized arena (${formattedName}). Environment features dynamic kinetic friction modeling (\u03bc_k \u2248 0.72), Sabine acoustic decay time RT60 \u2248 1.15 seconds with an 85 Hz Helmholtz baseline resonance, and Rayleigh optical sky scattering.`,
    accessibilityInfo: `High-fidelity natural terrain simulation calibrated for sensory whisker and acoustic echo navigation.`,
    pathPattern: "ground"
  };
}

export const PlaceResolverData = {
  registry: MasterPlaceRegistry,
  soundProfileMap: PlaceSoundProfileMap,
  createAIGeneratedPlaceDefinition
};
