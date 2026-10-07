/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WildcardLensConfig {
  tierName: string;
  gridMultiplier: number;
  chromaticAberration: number;
}

export const WildcardLensData = {
  defaultTier: "Wildcard_Adaptive_Grid",
  gridMultiplier: 1.0,
  chromaticAberration: 0.0001
};
