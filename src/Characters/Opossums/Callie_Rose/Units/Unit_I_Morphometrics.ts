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
  earScaleFactor: number;
  earLengthFactor: number;
  furryFace: boolean;
}

export const CALLIE_ROSE_MORPHOMETRICS: MorphometricProfile = {
  shoulderHeightInches: 71.444401003,
  shoulderHeightFormatted: "5 feet, 11.444401003 inches",
  bodyLengthInches: 95.88880003001, // 7 feet, 11.88880003001 inches
  fullBodyLengthInches: 138.88880003001,
  bodyWidthInches: 40.5,
  headWidthInches: 38.5,
  headHeightInches: 44.5,
  fullHeadHeightInches: 57.85, // 30% longer ears
  tailLengthInches: 28.5,
  massKg: 192.4,
  maxRiderHeightFormatted: "5 feet and 11 inches",
  earScaleFactor: 1.05, // 5% larger for scale
  earLengthFactor: 1.30, // 30% longer
  furryFace: false
};

export default CALLIE_ROSE_MORPHOMETRICS;
