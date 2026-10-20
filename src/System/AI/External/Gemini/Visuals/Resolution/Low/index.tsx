/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Low resolution optimization calculations.
 */
export const ResolutionLow = {
  /**
   * Calculates downscaled viewport sizes to save CPU/GPU overhead under heavy load.
   */
  getDownscaledDimensions(width: number, height: number, scale: number = 0.5): { w: number; h: number } {
    return {
      w: Math.max(120, Math.round(width * scale)),
      h: Math.max(90, Math.round(height * scale))
    };
  }
};
