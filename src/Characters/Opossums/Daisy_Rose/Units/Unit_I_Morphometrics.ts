/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MorphometricProfile {
  shoulderHeightInches: number;
  shoulderHeightFormatted: string;
  bodyLengthInches: number; // Excludes head and tail
  fullBodyLengthInches: number; // Includes head and tail
  bodyWidthInches: number;
  headWidthInches: number;
  headHeightInches: number;
  fullHeadHeightInches: number;
  tailLengthInches: number;
  massKg: number;
  maxRiderHeightFormatted: string;
  earScaleFactor: number;
  tailScaleFactor: number;
  furryFace: boolean;
}

export const DAISY_ROSE_MORPHOMETRICS: MorphometricProfile = {
  shoulderHeightInches: 73.00123,
  shoulderHeightFormatted: "6 feet, and 1.00123 inches",
  bodyLengthInches: 97.50002804, // 8 feet, 1.50002804 inches
  fullBodyLengthInches: 139.750036,
  bodyWidthInches: 44.0,
  headWidthInches: 38.5000144,
  headHeightInches: 46.5,
  fullHeadHeightInches: 56.5,
  tailLengthInches: 37.05, // 30% longer for scale (28.5 * 1.3)
  massKg: 198.5,
  maxRiderHeightFormatted: "6 feet and 1 inch",
  earScaleFactor: 1.04, // 4% larger for scale
  tailScaleFactor: 1.30, // 30% longer
  furryFace: false
};

export default DAISY_ROSE_MORPHOMETRICS;
