/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlayAreaAIConfig {
  layoutMode: "responsive_grid" | "fullscreen_canvas";
  viewportScale: number;
  hudOverlayEnabled: boolean;
  statusFeedEnabled: boolean;
  touchControlsActive: boolean;
}

export const PlayAreaGeneralAIConfig: PlayAreaAIConfig = {
  layoutMode: "responsive_grid",
  viewportScale: 1.0,
  hudOverlayEnabled: true,
  statusFeedEnabled: true,
  touchControlsActive: true
};

export function getPlayAreaAIConfig(): PlayAreaAIConfig {
  return { ...PlayAreaGeneralAIConfig };
}
