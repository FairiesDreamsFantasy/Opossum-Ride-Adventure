/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MobileResolutionConfig {
  renderWidth: number;
  renderHeight: number;
  scaleFactor: number;
}

export class MobileResolutionEngine {
  /**
   * Computes optimal render resolution for single or split canvases
   */
  public static calculateVerticalResolution(
    containerWidth: number,
    containerHeight: number,
    pixelationStep: number = 2
  ): MobileResolutionConfig {
    const rawWidth = Math.max(280, containerWidth);
    const rawHeight = Math.max(360, containerHeight);
    const scale = Math.max(1, pixelationStep);

    return {
      renderWidth: Math.floor(rawWidth / scale),
      renderHeight: Math.floor(rawHeight / scale),
      scaleFactor: scale
    };
  }

  /**
   * Computes upper 16:9 or 4:3 landscape canvas dimensions on a mobile phone
   */
  public static calculateUpperLandscapeResolution(
    screenWidth: number,
    aspectRatio: number = 16 / 9
  ): { width: number; height: number } {
    const width = Math.floor(screenWidth);
    const height = Math.floor(width / aspectRatio);
    return { width, height };
  }
}
