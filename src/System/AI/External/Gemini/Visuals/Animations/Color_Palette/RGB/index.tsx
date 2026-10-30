/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RGBColor, RGB_CONSTANTS } from "./General";

/**
 * High-fidelity RGB transformation and mixing operations.
 */
export const RGBColorSystem = {
  /**
   * Clamps channel values to correct 0-255 spectrum range.
   */
  clampColor(color: RGBColor): RGBColor {
    return {
      r: Math.max(RGB_CONSTANTS.MIN_CHANNEL, Math.min(RGB_CONSTANTS.MAX_CHANNEL, Math.round(color.r))),
      g: Math.max(RGB_CONSTANTS.MIN_CHANNEL, Math.min(RGB_CONSTANTS.MAX_CHANNEL, Math.round(color.g))),
      b: Math.max(RGB_CONSTANTS.MIN_CHANNEL, Math.min(RGB_CONSTANTS.MAX_CHANNEL, Math.round(color.b)))
    };
  },

  /**
   * Applies gamma correction to an RGB color for physical-world light consistency.
   */
  applyGamma(color: RGBColor, gamma: number = RGB_CONSTANTS.GAMMA): RGBColor {
    const invGamma = 1 / gamma;
    return this.clampColor({
      r: Math.pow(color.r / 255, invGamma) * 255,
      g: Math.pow(color.g / 255, invGamma) * 255,
      b: Math.pow(color.b / 255, invGamma) * 255
    });
  },

  /**
   * Linearly interpolates (blends) between two RGB color definitions.
   */
  interpolate(c1: RGBColor, c2: RGBColor, ratio: number): RGBColor {
    const r = c1.r * (1 - ratio) + c2.r * ratio;
    const g = c1.g * (1 - ratio) + c2.g * ratio;
    const b = c1.b * (1 - ratio) + c2.b * ratio;
    return this.clampColor({ r, g, b });
  }
};

export default RGBColorSystem;
export * from "./General";
