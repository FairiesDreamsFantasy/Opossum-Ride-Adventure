/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { INITIAL_PLACES, PlaceDefinition } from "../../../../../Arena";

export interface PlaceSoundProfile {
  bgmCategory: "meditation" | "orchard" | "farm" | "cave" | "manor" | "outdoor" | "synthetic_ai";
  ambientType: "breeze" | "greenhouse" | "reverb" | "cavern" | "rural" | "synthetic";
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
  cattle_farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Cattle_Farm" },
  horse_farm: { bgmCategory: "farm", ambientType: "rural", hasDedicatedBGMTrack: true, dedicatedTrackName: "Horse_Farm" },

  // Indoor / Manor
  floor_foyer: { bgmCategory: "manor", ambientType: "reverb", hasDedicatedBGMTrack: true, dedicatedTrackName: "Floor_Foyer" },
  stone_corridor: { bgmCategory: "manor", ambientType: "reverb", hasDedicatedBGMTrack: true, dedicatedTrackName: "Stone_Corridor" },
  stone_room: { bgmCategory: "manor", ambientType: "reverb", hasDedicatedBGMTrack: true, dedicatedTrackName: "Stone_Room" },

  // Caves & Mines
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

  // Outdoor Arenas
  plain: { bgmCategory: "outdoor", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Plain" },
  forest: { bgmCategory: "outdoor", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Forest" },
  mountains: { bgmCategory: "outdoor", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Mountains" },
  quarry: { bgmCategory: "outdoor", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Quarry" },
  desert: { bgmCategory: "outdoor", ambientType: "breeze", hasDedicatedBGMTrack: true, dedicatedTrackName: "Desert" },
  city: { bgmCategory: "outdoor", ambientType: "reverb", hasDedicatedBGMTrack: true, dedicatedTrackName: "City" },
};

/**
 * Creates an ultra-meaningful dynamic PlaceDefinition for AI-generated levels (ai_gen_*)
 * so that AI-generated levels never fall back to "garden".
 */
export function createAIGeneratedPlaceDefinition(placeId: string, customName?: string): PlaceDefinition {
  const normalized = placeId.toLowerCase().replace(/^ai_gen_/, "").replace(/_/g, " ");
  const formattedName = customName || normalized.replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    id: placeId,
    name: `AI Realm: ${formattedName}`,
    description: `A procedurally synthesized AI arena environment (${formattedName}) with dynamic surface physics and ambient scapes.`,
    surfaceType: "procedurally synthesized polymer asphalt",
    footstepSound: "synthetic acoustic dampening stride",
    colorBase: "#0284c7",
    ambientNoise: "procedural synthetic AI ambient frequency wave",
    longDescription: `An ultra-scientific procedurally generated AI arena (${formattedName}). Features dynamic surface friction, adaptive particle visual layers, and Web Audio API synthesized ambient scapes.`,
    accessibilityInfo: "AI-generated synthetic arena layout with procedurally calibrated surface boundaries.",
    pathPattern: "ground"
  };
}

export const PlaceResolverData = {
  registry: MasterPlaceRegistry,
  soundProfileMap: PlaceSoundProfileMap,
  createAIGeneratedPlaceDefinition
};
