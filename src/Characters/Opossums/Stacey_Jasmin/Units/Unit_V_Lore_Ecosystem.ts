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

export const STACEY_JASMIN_LORE: LoreProfile = {
  fullName: "Stacey Jasmin",
  gender: "Jill (Female)",
  passel: "Jasmine Passel",
  heritage: "Jasmine Family Lineage",
  religion: "Rastafari",
  ethnicity: "White",
  vocation: "Record Store Manager & Community Safety Advocate",
  babylonFree: true,
  interests: [
    "Studying stars at night",
    "Space",
    "Climate change awareness",
    "Supporting poacher hunters",
    "Gardening"
  ],
  narrativeHistory:
    "Stacey Jasmin is a jill opossum of the Jasmine passel who partnered with Agape Rose following a series of night poaching incidents and illegal trade attempts. A firm non-violence advocate, Stacey works at a physical record store catering to non-digital communities and vinyl music enthusiasts. She has assisted law enforcement in tracking down illegal cartels responsible for urban chaos and worked to support individuals recovering from substance abuse. Stacey actively combats anti-opossum pseudoscience, advocates for child protection, and works to end family violence and parental greed behind closed doors.",
  ecosystemRole:
    "Standing 5 feet 8.999 inches at the shoulder with a purple coat, yellow saddle, 35% thicker fur, and a white gold tiara with a circular yellow moon gem, Stacey Jasmin is a dedicated nocturnal protector and community guardian."
};

export default STACEY_JASMIN_LORE;
