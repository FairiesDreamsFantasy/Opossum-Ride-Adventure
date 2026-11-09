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

export const JACINTA_OPOSSUM_LORE: LoreProfile = {
  fullName: "Jacinta Opossum",
  gender: "Jill (Female)",
  passel: "Opossum Passel",
  heritage: "Opossum Family Lineage (Twin of Camryn)",
  religion: "Rastafari",
  ethnicity: "White / Caucasian",
  vocation: "Gardener, Scientist & Poacher Hunter",
  babylonFree: true,
  interests: [
    "Botany",
    "Soil science",
    "Wildlife preservation",
    "Anti-poaching tactical training",
    "Sustainable land stewardship"
  ],
  narrativeHistory:
    "Jacinta Opossum is a brilliant scientist and skilled gardener sharing the Opossum passel. Alongside her twin sister Camryn, she is dedicated to wildlife preservation and defending fragile ecosystems against illegal exploitation. As an in-law to Melissa and Ashley Opossum, Jacinta contributes to the passel's security by monitoring the growth of protective barrier vegetation and coordinating with local poacher hunters to ensure the safety of all forest kin.",
  ecosystemRole:
    "Standing 5 feet 3 inches at the shoulder with a solid red coat, Jacinta Opossum manages the sanctuary's botanical integrity while serving as a vigilant protector against environmental incursions."
};

export default JACINTA_OPOSSUM_LORE;
