/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ASHLEY OPOSSUM - UNIT V: LORE, ETHOS & ECOSYSTEM HARMONY
 * ============================================================================
 * Cultural background, Rastafari livity, ecological principles, and sanctuary
 * navigation guidelines for Ashley Opossum.
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

export const ASHLEY_OPOSSUM_LORE: LoreProfile = {
  characterName: "Ashley Opossum",
  passel: "Opossum Family Passel",
  vocation: "Tactical Navigator, Industrial Safety Advocate, Conservation Specialist",
  philosophy: "Advocating for industrial safety, robust environmental conservation, and absolute freedom from Babylonian constraints.",
  habitat: {
    biome: "Temperate Forests and Protected Valley Reserves",
    altitudeRangeMeters: "200m - 1400m",
    temperatureCelsius: { min: 9, max: 28 },
    foragingPreferences: ["Wild Nuts", "Berries", "Organic Grains", "Fresh Spring Water"]
  },
  sanctuaryGuidingRules: [
    "Champion robust industrial safety standards and environmental conservation.",
    "Provide riders with exceptional forward momentum and calculated turning dynamics.",
    "Maintain complete independence from artificial Babylonian institutions.",
    "Preserve sanctuary flora and fauna in unblemished purity."
  ]
};

export default ASHLEY_OPOSSUM_LORE;
