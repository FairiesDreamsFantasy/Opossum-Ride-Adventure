/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Text formatting, letter spacing, and character clipping for screen HUD layouts.
 */
export const AnimationsText = {
  /**
   * Truncates text cleanly with ellipses if it exceeds max character allowance.
   */
  truncateText(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, Math.max(3, maxLength - 3)) + "...";
  },

  /**
   * Generates display-grade visual kerning tracking values.
   */
  getKerningStyle(trackingPx: number): string {
    return `${trackingPx}px`;
  }
};
