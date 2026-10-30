/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * WANDA OPOSSUM - UNIT V: LORE, ECOSYSTEM & RASTAFARI LIVITY
 * ============================================================================
 * Cultural background, Rastafari livity, ecological principles, and sanctuary
 * navigation guidelines for Wanda Opossum.
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

export const WANDA_OPOSSUM_LORE: LoreProfile = {
  characterName: "Wanda Opossum",
  passel: "Opossum Family Passel",
  vocation: "Sanctuary Wanderer, Mindful Guardian, Naturalist",
  philosophy: "Embodying Rastafari livity, peaceful natural wandering, mindfulness, and absolute freedom from institutional dogmas.",
  habitat: {
    biome: "Serene Forest Canopies and Sanctuary Meadows",
    altitudeRangeMeters: "150m - 1100m",
    temperatureCelsius: { min: 11, max: 27 },
    foragingPreferences: ["Wild Berries", "Botanical Greens", "Spring Water", "Herbal Foliage"]
  },
  sanctuaryGuidingRules: [
    "Wander sanctuary landscapes with mindful grace and peaceful awareness.",
    "Reject institutional dogmas and artificial Babylonian constraints entirely.",
    "Provide riders with gentle, highly shock-absorbent walking gaits.",
    "Preserve natural meadows and forest trails in pristine harmony."
  ]
};

export default WANDA_OPOSSUM_LORE;
