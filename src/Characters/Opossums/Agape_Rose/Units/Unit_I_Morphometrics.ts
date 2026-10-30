/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MorphometricProfile {
  name: string;
  id: string;
  shoulderHeightInches: number;
  bodyWidthInches: number;
  bodyLengthInches: number;
  headWidthInches: number;
  headHeightInches: number;
  gender: "Female";
  furCoatDesign: string;
  skinType: string;
  eyeColor: string;
  noseColor: string;
  innerEarColor: string;
  outerEarColor: string;
  tailDesign: string;
  pawColor: string;
  faceFurryPercentage: number;
  accessories: string[];
}

export const AGAPE_ROSE_MORPHOMETRICS: MorphometricProfile = {
  name: "Agape Rose",
  id: "agape_rose",
  shoulderHeightInches: 65.0,
  bodyWidthInches: 42.0,
  bodyLengthInches: 90.1,
  headWidthInches: 40.0,
  headHeightInches: 42.0,
  gender: "Female",
  furCoatDesign: "Rich Gold coat with pink circles",
  skinType: "Honey Dark-Brown",
  eyeColor: "Light-Green",
  noseColor: "Dark-Pink",
  innerEarColor: "Dark-Pink",
  outerEarColor: "Gold",
  tailDesign: "Flexible winding dark pink tail",
  pawColor: "Orange",
  faceFurryPercentage: 0,
  accessories: ["White Gold Tiara with Moon Gem", "Green Earrings"]
};

export default AGAPE_ROSE_MORPHOMETRICS;
