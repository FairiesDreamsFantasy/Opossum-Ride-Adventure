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

export const CALLIE_ROSE_LORE: LoreProfile = {
  fullName: "Callie Rose",
  gender: "Jill (Female)",
  passel: "Rose Passel",
  heritage: "Rose Family Lineage",
  religion: "Rastafari",
  ethnicity: "White",
  vocation: "Factory Owner & Industrial Safety Whistleblower",
  babylonFree: true,
  interests: [
    "Employment",
    "Traveling",
    "Technology",
    "Computer science (treating AI as a tool)",
    "Gaming",
    "Arcades",
    "Gardening",
    "Farming",
    "Zoology",
    "Artistry"
  ],
  narrativeHistory:
    "Callie Rose is a jill opossum of the Rose passel and sister-in-law to Daisy Rose. Formerly employed as a freezer technician at a manufacturing plant, Callie consistently applied scientific analysis to fix refrigeration systems. When fraudulent owners acquired the factory and compromised safety to prioritize capital over human life, Callie alerted employees of an impending explosion. Her warning enabled a complete evacuation before the blast wiped out the plant and led to the arrest of the fraudulent owners for financial crime. Staying hidden to protect herself from retaliatory attacks, Callie eventually founded her own factory where 100% Babylon-Free goods are produced safely and ethically.",
  ecosystemRole:
    "Standing 5 feet 11.444401003 inches at the shoulder with circular white gold & brass reading glasses, a 6-inch vertical emerald tiara, and a violet diamond necklace, Callie Rose embodies industrial safety and scientific whistleblower courage."
};

export default CALLIE_ROSE_LORE;
