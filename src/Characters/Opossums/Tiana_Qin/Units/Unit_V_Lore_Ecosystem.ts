/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * TIANA QIN - UNIT V: LORE, ETHOS & ECOSYSTEM HARMONY
 * ============================================================================
 * Cultural background, Rastafari livity, ecological principles, and sanctuary
 * navigation guidelines for Tiana Qin.
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

export const TIANA_QIN_LORE: LoreProfile = {
  characterName: "Tiana Qin",
  passel: "Qin Passel",
  vocation: "Scientist, Acoustic Analyst, Musician, Babylon-Free Store Cashier, Educator",
  philosophy: "Upholding Black Rastafarian livity, ecological guardianship, economic autonomy, and independent education for the next generation.",
  habitat: {
    biome: "Highland Forest Sanctuary and Coastal Bio-Reserves",
    altitudeRangeMeters: "300m - 1500m",
    temperatureCelsius: { min: 12, max: 29 },
    foragingPreferences: ["Fresh Botanical Greens", "Organic Fruits", "Spring Water", "Herbal Tonics"]
  },
  sanctuaryGuidingRules: [
    "Educate daughters and community members in ecological guardianship and Babylon-Free self-reliance.",
    "Operate commerce through fair-trade, authentic, non-exploitative exchange.",
    "Maintain balanced cadence and athletic grace in all mount transits.",
    "Preserve sacred forest boundaries against ecological degradation."
  ]
};

export default TIANA_QIN_LORE;
