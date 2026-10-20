/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface JosephDimensions {
  shoulderHeightFeet: number;
  shoulderHeightInches: number;
  snoutLengthRelative: number;
  nostrilDiameterInches: number;
  pinkMuzzleTipPercentage: number;
  earScaleFactor: number;
  hoofThicknessFactor: number;
}

export const JOSEPH_DIMENSIONS: JosephDimensions = {
  shoulderHeightFeet: 7.105, // 1.5% taller than Angelica's 7.0 ft
  shoulderHeightInches: 85.26,
  snoutLengthRelative: 1.0, // Same as Angelica's snout length
  nostrilDiameterInches: 1.5,
  pinkMuzzleTipPercentage: 15, // 15% of snout length from muzzle
  earScaleFactor: 1.20, // 20% larger ears
  hoofThicknessFactor: 1.20 // 20% thicker hooves
};
