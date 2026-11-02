/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlayAreaGeneralConfig {
  systemName: string;
  version: string;
  canvasContainerId: string;
  defaultTheme: string;
  supportedViewports: string[];
}

export const PlayAreaGeneralRegistry: PlayAreaGeneralConfig = {
  systemName: "Opossum Ride Adventure - Play Area",
  version: "4.0.0",
  canvasContainerId: "Play_Area_Container",
  defaultTheme: "dark",
  supportedViewports: [
    "desktop-widescreen",
    "tablet-portrait",
    "mobile-portrait-retro",
    "mobile-portrait-panorama",
    "mobile-portrait-dual-screen",
    "mobile-landscape"
  ]
};
