/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * JALISSA CHIN - UNIT V: LORE, ETHOS & ECOSYSTEM HARMONY
 * ============================================================================
 * Cultural background, Rastafari livity, ecological principles, and sanctuary
 * navigation guidelines for Jalissa Chin.
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

export const JALISSA_CHIN_LORE: LoreProfile = {
  characterName: "Jalissa Chin",
  passel: "Chin Passel",
  vocation: "Anti-Terrorism Advocate, Agricultural Self-Reliance Specialist, Habitat Protector",
  philosophy: "Advocating for peace, vigilance against exploitation, agricultural self-reliance, and the pure preservation of wildlife habitats.",
  habitat: {
    biome: "Highland Sanctuaries and Agricultural Grove Edges",
    altitudeRangeMeters: "250m - 1300m",
    temperatureCelsius: { min: 11, max: 28 },
    foragingPreferences: ["Root Vegetables", "Wild Berries", "Organic Grains", "Fresh Spring Water"]
  },
  sanctuaryGuidingRules: [
    "Stand firm against all forms of exploitation, violence, and terrorism.",
    "Cultivate agricultural self-reliance and sustainable organic food growth.",
    "Navigate terrain with rapid agility and unwavering firm footing.",
    "Protect natural habitats and sanctuary borders with steadfast vigilance."
  ]
};

export default JALISSA_CHIN_LORE;
