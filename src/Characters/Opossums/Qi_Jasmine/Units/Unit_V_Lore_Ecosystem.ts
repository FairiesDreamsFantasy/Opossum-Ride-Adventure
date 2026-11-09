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

export const QI_JASMINE_LORE: LoreProfile = {
  fullName: "Qi Jasmine",
  gender: "Jill (Female)",
  passel: "Jasmine Passel",
  heritage: "Jasmine Family Lineage (Triplet of Dale & Jamie)",
  religion: "Rastafari only",
  ethnicity: "Primary White (Mother White, Father Black)",
  vocation: "Anti-Poaching Tech Specialist & Lunar Leadership Member",
  babylonFree: true,
  interests: [
    "Hardware hacking",
    "Recycling mobile tech",
    "Wildlife preservation",
    "Anti-trafficking operations",
    "Martial arts"
  ],
  narrativeHistory:
    "Qi Jasmine is a high-tech poacher hunter within the Jasmine passel. She specializes in converting decommissioned mobile devices into high-precision tracking sensors used to intercept illegal trade in ivory and rhino horns. A fierce defender of her kin and all innocent species, Qi has personally facilitated the arrest of hundreds of poachers. She predicted the collapse of several oppressive dictatorships and often travels to Japan for tactical and spiritual replenishment when not on active duty.",
  ecosystemRole:
    "Standing 5 feet 7.123 inches at the shoulder with a blue coat and green circular pattern, Qi Jasmine serves as a technical sentinel within the Lunar Leadership, monitoring the borders for illegal incursions."
};

export default QI_JASMINE_LORE;
