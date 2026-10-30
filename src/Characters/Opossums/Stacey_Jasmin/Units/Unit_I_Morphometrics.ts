/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MorphometricProfile {
  shoulderHeightInches: number;
  shoulderHeightFormatted: string;
  bodyLengthInches: number;
  fullBodyLengthInches: number;
  bodyWidthInches: number;
  headWidthInches: number;
  headHeightInches: number;
  fullHeadHeightInches: number;
  tailLengthInches: number;
  massKg: number;
  maxRiderHeightFormatted: string;
  furThicknessPercent: number;
  furryFace: boolean;
}

export const STACEY_JASMIN_MORPHOMETRICS: MorphometricProfile = {
  shoulderHeightInches: 68.999,
  shoulderHeightFormatted: "5 feet, 8.999 inches",
  bodyLengthInches: 95.9988, // 7.9999 feet
  fullBodyLengthInches: 135.9988,
  bodyWidthInches: 38.5,
  headWidthInches: 36.0,
  headHeightInches: 43.0,
  fullHeadHeightInches: 53.0,
  tailLengthInches: 28.0,
  massKg: 185.2,
  maxRiderHeightFormatted: "5 feet and 9 inches",
  furThicknessPercent: 135, // 35% thicker
  furryFace: false
};

export default STACEY_JASMIN_MORPHOMETRICS;
