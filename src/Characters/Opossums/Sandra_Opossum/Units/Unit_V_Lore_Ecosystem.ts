/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * SANDRA OPOSSUM - UNIT V: LORE, ETHOS & ECOSYSTEM HARMONY
 * ============================================================================
 * Cultural background, Rastafari livity, ecological principles, and sanctuary
 * navigation guidelines for Sandra Opossum.
 */

export interface EcologicalHabitat {
  biome: string;
  altitudeRangeMeters: string;
  temperatureCelsius: { min: number; max: number };
  foragingPreferences: string[];
}

export interface LoreProfile {
  characterName: string;
  passel: string;
  vocation: string;
  philosophy: string;
  habitat: EcologicalHabitat;
  sanctuaryGuidingRules: string[];
}

export const SANDRA_OPOSSUM_LORE: LoreProfile = {
  characterName: "Sandra Opossum",
  passel: "Opossum Family Passel",
  vocation: "Skilled Craftsman, Industrial Technician, Community Security Partner",
  philosophy: "Honest labor, mutual support, industrial safety, sustainable living, and loyalty to family Babylon-Free principles.",
  habitat: {
    biome: "Highland Workshops and Sanctuary Grounds",
    altitudeRangeMeters: "200m - 1300m",
    temperatureCelsius: { min: 10, max: 28 },
    foragingPreferences: ["Nutritional Root Nodes", "Wild Berries", "Organic Grains", "Spring Water"]
  },
  sanctuaryGuidingRules: [
    "Dedicate craft and technical skill to honest labor and community security.",
    "Reject destructive social dynamics and Babylonian exploitation.",
    "Navigate sanctuary terrain with precision and stable cornering.",
    "Protect family and community through mutual support and sustainable living."
  ]
};

export default SANDRA_OPOSSUM_LORE;
