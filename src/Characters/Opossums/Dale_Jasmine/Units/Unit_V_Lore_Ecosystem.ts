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

export const DALE_JASMINE_LORE: LoreProfile = {
  fullName: "Dale Jasmine",
  gender: "Jill (Female)",
  passel: "Jasmine Passel",
  heritage: "Jasmine Family Lineage (True Syster of Stacey)",
  religion: "Rastafari only",
  ethnicity: "Primary White (Mother White, Father Black)",
  vocation: "Lunar Leadership Member & Food Safety Advocate",
  babylonFree: true,
  interests: [
    "Food safety auditing",
    "Preventing capitalism prioritization",
    "Military history",
    "Anti-trafficking operations",
    "Industrial safety"
  ],
  narrativeHistory:
    "Dale Jasmine is an opossum of a Jasmine passel and Stacey's true syster. Once a factory worker in a peanut facility, she brought a major poisoning scandal to light, leading to significant government reforms. After the facility was converted into a garden, Dale transitioned to becoming a dedicated food safety advocate, ensuring that corporate greed never supersedes worker or consumer safety. Her ancestors chose industrial ownership over exploitative trade, believing in the value of honorable labor and machine-assisted precision.",
  ecosystemRole:
    "Standing 5 feet 7.123 inches at the shoulder with a lavender coat and green rose pattern, Dale Jasmine serves as a member of the Lunar Leadership, monitoring supply chains and protecting the realm's food integrity."
};

export default DALE_JASMINE_LORE;
