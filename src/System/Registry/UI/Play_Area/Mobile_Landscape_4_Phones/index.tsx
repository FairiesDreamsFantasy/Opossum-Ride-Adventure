/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MobileLandscapeRegistryConfig {
  id: string;
  name: string;
  aspectRatio: string;
  leftDeckWidthPercent: number;
  rightDeckWidthPercent: number;
  colorScheme: string;
  supportsToggleableDecks: boolean;
}

export const MobileLandscape4PhonesRegistry: MobileLandscapeRegistryConfig = {
  id: "mobile-landscape-registry",
  name: "Mobile Landscape 4 Phones Layout",
  aspectRatio: "16:9",
  leftDeckWidthPercent: 22,
  rightDeckWidthPercent: 22,
  colorScheme: "night-sky-amber",
  supportsToggleableDecks: true
};
