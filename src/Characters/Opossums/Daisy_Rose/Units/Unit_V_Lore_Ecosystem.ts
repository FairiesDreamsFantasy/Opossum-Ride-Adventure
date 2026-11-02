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

export const DAISY_ROSE_LORE: LoreProfile = {
  fullName: "Daisy Rose",
  gender: "Jill (Female)",
  passel: "Rose Passel",
  heritage: "Rose Family Lineage",
  religion: "Rastafari",
  ethnicity: "White",
  vocation: "Solar Guardian & Custom Non-Mass-Produced Factory Manufacturing Technician",
  babylonFree: true,
  interests: [
    "Gardening",
    "Helping others",
    "Renewable energy",
    "Jamaican culture",
    "Employment",
    "Government reform",
    "Copyleft and open-source culture",
    "Coding",
    "Gaming",
    "Arcades",
    "Japanese cuisine",
    "Chinese cuisine",
    "Jamaican cuisine",
    "Community work",
    "Science"
  ],
  narrativeHistory:
    "Daisy Rose is a large jill opossum born into the Rose passel. Encouraged by her mother, a skilled farmer, Daisy developed a passion for gardening early in life. Attending a Babylon-Free school, she studied global systemic issues and taken educational trips to understand why Babylon fosters chaos. Becoming a solar guardian, Daisy helped poacher hunters track down illegal poachers and reduce ivory trade to protect elephants. Her sister-in-law, Agape Rose, wears a white gold tiara with a glowing moon gem at night. Today, Daisy works at a specialized factory manufacturing custom non-mass-produced goods tailored to customer specifications.",
  ecosystemRole:
    "At 6 feet 1.00123 inches shoulder height, Daisy Rose provides exceptional stability and solar-guarding reassurance. Her pink coat decorated with 4-inch daisy patterns with blue borders and her gold sun tiara reflect her daytime solar leadership."
};

export default DAISY_ROSE_LORE;
