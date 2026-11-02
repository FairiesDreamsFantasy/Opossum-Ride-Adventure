/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Custom retro grid pixelation transformations.
 */
export const AnimationsPixelations = {
  /**
   * Snaps a spatial position to a pixel grid matrix coordinate.
   */
  snapToPixelGrid(pos: number, pixelSize: number): number {
    return Math.floor(pos / pixelSize) * pixelSize;
  },

  /**
   * Computes retro grid downsampling scaling.
   */
  getPixelScaleRatio(baseWidth: number, targetPixelWidth: number): number {
    return Math.max(1, Math.round(baseWidth / targetPixelWidth));
  }
};
