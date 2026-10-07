/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PictureWindowConfig = {
  id: "picture-window",
  name: "Picture Window Panorama",
  skyCanvasRatio: 0.35, // Upper 35% dedicated to sky, moon, and canopies
  trackCanvasRatio: 0.65, // Lower 65% dedicated to track, lane obstacles, and opossums
  skyCameraPitchOffset: 15,
  trackCameraPitchOffset: -12,
  seamDividerWidthPx: 2
};
