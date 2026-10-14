/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../../../../Arena";
import { MasterPlaceRegistry, PlaceSoundProfileMap, PlaceSoundProfile, createAIGeneratedPlaceDefinition } from "../Data";

export class PlaceResolverGeneralEngine {
  public static readonly systemName = "Place Resolver General Engine";

  /**
   * Deterministically resolves any place ID to a complete PlaceDefinition.
   * Completely eliminates arbitrary fallback to "garden".
   */
  public static resolvePlace(placeId: string, customName?: string): PlaceDefinition {
    if (!placeId) {
      return MasterPlaceRegistry.garden;
    }

    const key = placeId.trim().toLowerCase();

    // 1. Check exact key match in Master Registry
    if (MasterPlaceRegistry[key]) {
      return MasterPlaceRegistry[key];
    }

    // 2. Check case-insensitive key matches
    const matchedKey = Object.keys(MasterPlaceRegistry).find((k) => k.toLowerCase() === key);
    if (matchedKey) {
      return MasterPlaceRegistry[matchedKey];
    }

    // 3. Handle AI-Generated Arena IDs (ai_gen_*)
    if (key.startsWith("ai_gen_") || key.includes("ai_gen")) {
      return createAIGeneratedPlaceDefinition(placeId, customName);
    }

    // 4. Handle Sub-Arena Pattern Matching (Orchards, Farms, Mines, Gardens)
    if (key.includes("orchard") || key.includes("grove")) {
      return {
        ...MasterPlaceRegistry.the_grand_orchard,
        id: placeId,
        name: customName || `Orchard: ${key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
      };
    }

    if (key.includes("farm")) {
      return {
        ...MasterPlaceRegistry.farm,
        id: placeId,
        name: customName || `Farm: ${key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
      };
    }

    if (key.includes("mine")) {
      return {
        ...MasterPlaceRegistry.gold_mine,
        id: placeId,
        name: customName || `Mine: ${key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
      };
    }

    if (key.includes("foyer") || key.includes("hall") || key.includes("corridor")) {
      return {
        ...MasterPlaceRegistry.floor_foyer,
        id: placeId,
        name: customName || `Manor Structure: ${key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
      };
    }

    // 5. Construct a dynamic PlaceDefinition for unknown custom place IDs without falling back to garden
    return createAIGeneratedPlaceDefinition(placeId, customName);
  }

  /**
   * Resolves the exact BGM & ambient sound profile for a place ID.
   */
  public static getPlaceBGMProfile(placeId: string): PlaceSoundProfile {
    if (!placeId) {
      return PlaceSoundProfileMap.garden;
    }

    const key = placeId.trim().toLowerCase();

    // 1. Direct map lookup
    if (PlaceSoundProfileMap[key]) {
      return PlaceSoundProfileMap[key];
    }

    // 2. AI Generated Levels
    if (key.startsWith("ai_gen_") || key.includes("ai_gen")) {
      return {
        bgmCategory: "synthetic_ai",
        ambientType: "synthetic",
        hasDedicatedBGMTrack: false,
      };
    }

    // 3. Pattern Category Classifications
    if (key.includes("orchard") || key.includes("grove")) {
      return {
        bgmCategory: "orchard",
        ambientType: "breeze",
        hasDedicatedBGMTrack: true,
        dedicatedTrackName: "The_Grand_Orchard",
      };
    }

    if (key.includes("farm")) {
      return {
        bgmCategory: "farm",
        ambientType: "rural",
        hasDedicatedBGMTrack: true,
        dedicatedTrackName: "Farm",
      };
    }

    if (key.includes("mine") || key.includes("cave") || key.includes("cavern")) {
      return {
        bgmCategory: "cave",
        ambientType: "cavern",
        hasDedicatedBGMTrack: true,
        dedicatedTrackName: "Cave",
      };
    }

    if (key.includes("foyer") || key.includes("corridor") || key.includes("vault") || key.includes("chamber")) {
      return {
        bgmCategory: "manor",
        ambientType: "reverb",
        hasDedicatedBGMTrack: true,
        dedicatedTrackName: "Floor_Foyer",
      };
    }

    // 4. Generic Outdoor Fallback for unknown battle places
    return {
      bgmCategory: "outdoor",
      ambientType: "breeze",
      hasDedicatedBGMTrack: false,
    };
  }

  /**
   * Universal Enemy Allowlist Evaluator.
   * Enables opponents for combat/exploration arenas, orchards, groves, farms, foyer, mines, and AI levels.
   * Excludes opponents strictly for peaceful meditation sanctuaries (Garden, Zen Stone Garden, Butterfly Sanctuary, etc.).
   */
  public static isEnemyAllowedInPlace(placeId: string): boolean {
    if (!placeId) return false;
    const normalized = placeId.trim().toLowerCase();

    // Dedicated peaceful sanctuaries (NO opponents allowed)
    const peacefulSanctuaries = [
      "garden",
      "zen_stone_garden",
      "botanical_maze",
      "butterfly_sanctuary",
      "orchid_glasshouse",
      "edible_berry_garden",
    ];

    if (peacefulSanctuaries.includes(normalized)) {
      return false;
    }

    // Explicitly allow enemies in AI-generated places, orchards, groves, farms, mines, caves, forests, mountains, etc.
    return true;
  }
}

export const PlaceResolverGeneral = {
  systemName: PlaceResolverGeneralEngine.systemName,
  resolvePlace: PlaceResolverGeneralEngine.resolvePlace,
  getPlaceBGMProfile: PlaceResolverGeneralEngine.getPlaceBGMProfile,
  isEnemyAllowedInPlace: PlaceResolverGeneralEngine.isEnemyAllowedInPlace,
};
