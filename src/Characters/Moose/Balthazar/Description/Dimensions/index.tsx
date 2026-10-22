/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BalthazarDimensions {
  shoulderHeightFeet: number;
  shoulderHeightInches: number;
  snoutLengthRelative: number;
  whiteMuzzlePercentage: number;
  antlerSpreadFeet: number;
  hoofThicknessFactor: number;
}

export const BALTHAZAR_DIMENSIONS: BalthazarDimensions = {
  shoulderHeightFeet: 7.0,
  shoulderHeightInches: 84.0,
  snoutLengthRelative: 1.0,
  whiteMuzzlePercentage: 20, // White on 20% of snout from tip of his muzzle
  antlerSpreadFeet: 6.5,
  hoofThicknessFactor: 1.15
};
