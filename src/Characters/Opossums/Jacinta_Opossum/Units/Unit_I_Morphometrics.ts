/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MorphometricProfile {
  shoulderHeightInches: number;
  shoulderHeightFormatted: string;
  bodyLengthInches: number;
  bodyWidthInches: number;
  headWidthInches: number;
  headHeightInches: number;
  tailLengthMultiplier: number;
  furryFace: boolean;
}

export const JACINTA_OPOSSUM_MORPHOMETRICS: MorphometricProfile = {
  shoulderHeightInches: 63,
  shoulderHeightFormatted: "5 feet and 3 inches",
  bodyLengthInches: 86,
  bodyWidthInches: 36,
  headWidthInches: 36,
  headHeightInches: 35,
  tailLengthMultiplier: 1.0,
  furryFace: false
};

export default JACINTA_OPOSSUM_MORPHOMETRICS;
