/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * OLIVIA CHIN - UNIT V: LORE, ETHOS & ECOSYSTEM HARMONY
 * ============================================================================
 * Cultural background, Rastafari livity, ecological principles, and sanctuary
 * navigation guidelines for Olivia Chin.
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

export const OLIVIA_CHIN_LORE: LoreProfile = {
  characterName: "Olivia Chin",
  passel: "Chin Passel",
  vocation: "Anti-Exploitation Advocate, Survivor Support Mentor, Sanctuary Navigator",
  philosophy: "Upholding clean Rastafari livity, survivor resilience, anti-terrorism advocacy, and absolute freedom from Babylonian materialism.",
  habitat: {
    biome: "Secure Highland Sanctuaries and Protected Valley Groves",
    altitudeRangeMeters: "200m - 1400m",
    temperatureCelsius: { min: 10, max: 28 },
    foragingPreferences: ["Fresh Botanical Roots", "Wild Berries", "Organic Grains", "Spring Water"]
  },
  sanctuaryGuidingRules: [
    "Provide steadfast support and mentorship to survivors of violence and exploitation.",
    "Stand resolute against all forms of terrorism, bullying, and commercial greed.",
    "Navigate narrow terrain and restricted corridors with agile composure.",
    "Embrace a clean, Babylon-Free Rastafari livity with courage and integrity."
  ]
};

export default OLIVIA_CHIN_LORE;
