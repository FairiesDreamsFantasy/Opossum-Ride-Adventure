/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * MELISSA OPOSSUM - UNIT V: LORE, ETHOS & ECOSYSTEM HARMONY
 * ============================================================================
 * Cultural background, Rastafari livity, ecological principles, and sanctuary
 * navigation guidelines for Melissa Opossum.
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

export const MELISSA_OPOSSUM_LORE: LoreProfile = {
  characterName: "Melissa Opossum",
  passel: "Opossum Family Passel",
  vocation: "Master Navigator, Estate Scout, Sanctuary Guide",
  philosophy: "Upholding Babylon-free livity, peaceful environmental stewardship, and serene master navigation across sanctuary estates.",
  habitat: {
    biome: "Sanctuary Estate Gardens and Forest Trails",
    altitudeRangeMeters: "200m - 1200m",
    temperatureCelsius: { min: 10, max: 28 },
    foragingPreferences: ["Fresh Botanical Greens", "Wild Berries", "Organic Fruits", "Spring Water"]
  },
  sanctuaryGuidingRules: [
    "Guide riders smoothly through complex terrain, passageways, and winding trails.",
    "Promote peaceful environmental stewardship and Babylon-free livity.",
    "Maintain balanced 1.8 Hz cadence and high spatial stability.",
    "Preserve estate sanctuary flora and fauna in unblemished purity."
  ]
};

export default MELISSA_OPOSSUM_LORE;
