/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TabletPortraitRegistryConfig {
  id: string;
  name: string;
  leftBezelWidthPercent: number;
  rightBezelWidthPercent: number;
  touchDeckHeight: string;
  bezelThemes: string[];
  hasPhysicalKeyboardDetection: boolean;
}

export const PortraitOrientation4TabletsRegistry: TabletPortraitRegistryConfig = {
  id: "tablet-portrait-registry",
  name: "Tablet Portrait Orientation Layout",
  leftBezelWidthPercent: 10,
  rightBezelWidthPercent: 10,
  touchDeckHeight: "auto",
  bezelThemes: ["botanical-leaves", "crafted-opossum-accent", "rider-motif"],
  hasPhysicalKeyboardDetection: true
};
