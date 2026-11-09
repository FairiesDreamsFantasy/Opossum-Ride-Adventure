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

export const CAMRYN_OPOSSUM_LORE: LoreProfile = {
  fullName: "Camryn Opossum",
  gender: "Jill (Female)",
  passel: "Opossum Passel",
  heritage: "Opossum Family Lineage (Twin of Jacinta)",
  religion: "Rastafari",
  ethnicity: "White / Caucasian",
  vocation: "Scientist, Gardener & Wildlife Habitat Defender",
  babylonFree: true,
  interests: [
    "Ecosystem restoration",
    "Soil health",
    "Permaculture",
    "Forestry",
    "Defending innocent creatures"
  ],
  narrativeHistory:
    "Camryn Opossum is a dedicated scientist and wildlife habitat defender within the Opossum passel. Working in tandem with her twin sister Jacinta, she focuses on the restoration of degraded forest corridors and the protection of biodiversity. As an in-law to Melissa and Ashley Opossum, Camryn applies her scientific expertise to develop non-invasive monitoring systems that help poacher hunters detect threats without disturbing the natural peace of the sanctuary.",
  ecosystemRole:
    "Standing 5 feet 3 inches at the shoulder with a solid light green coat, Camryn Opossum provides the scientific foundation for the sanctuary's defensive strategies while actively participating in reforestation efforts."
};

export default CAMRYN_OPOSSUM_LORE;
