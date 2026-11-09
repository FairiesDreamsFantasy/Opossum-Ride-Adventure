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

export const DALE_JASMINE_MORPHOMETRICS: MorphometricProfile = {
  shoulderHeightInches: 67.123,
  shoulderHeightFormatted: "5 feet and 7.123 inches",
  bodyLengthInches: 7.1234, // Body Length excluding head and tail
  bodyWidthInches: 38.88,
  headWidthInches: 37.77,
  headHeightInches: 44.88,
  tailLengthMultiplier: 1.2, // 20% longer for scale
  furryFace: false
};

export default DALE_JASMINE_MORPHOMETRICS;
