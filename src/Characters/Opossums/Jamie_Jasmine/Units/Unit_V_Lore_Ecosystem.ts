/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LoreProfile {
  fullName: string;
  gender: string;
  passel: string;
  heritage: string;
  religion: string;
  ethnicity: string;
  vocation: string;
  babylonFree: boolean;
  interests: string[];
  narrativeHistory: string;
  ecosystemRole: string;
}

export const JAMIE_JASMINE_LORE: LoreProfile = {
  fullName: "Jamie Jasmine",
  gender: "Jill (Female)",
  passel: "Jasmine Passel",
  heritage: "Jasmine Family Lineage (Triplet of Dale & Qi)",
  religion: "Rastafari only",
  ethnicity: "Primary White (Mother White, Father Black)",
  vocation: "Weather Scientist & Specialized Anti-Poaching Decoy",
  babylonFree: true,
  interests: [
    "Meteorology",
    "Ecosystem mapping",
    "Forestry",
    "Anti-trafficking operations",
    "Community support"
  ],
  narrativeHistory:
    "Jamie Jasmine is a silver-coated jill within the Jasmine passel. She is a specialized weather scientist studying global weather patterns and ecosystem health. Using her unique metallic coat as a tactical advantage, she often serves as a specialized decoy for poacher hunters, bringing criminal networks to light. She is deeply committed to protecting children from exploitation and supporting community-building initiatives in Jamaica during her off-duty travels.",
  ecosystemRole:
    "Standing 5 feet 7.123 inches at the shoulder with a solid silver coat, Jamie Jasmine monitors atmospheric changes and coordinates with ground-based protectors to maintain the safety of the natural realm."
};

export default JAMIE_JASMINE_LORE;
