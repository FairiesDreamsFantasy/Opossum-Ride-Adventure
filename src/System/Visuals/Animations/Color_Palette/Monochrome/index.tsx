/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Monochrome Visuals System
 * Manages dual-color aesthetics, grayscale mapping, and vintage displays.
 */
export const MonochromeSystem = {
  toGrayscale: (r: number, g: number, b: number) => {
    // Standard luminosity coefficients
    return 0.299 * r + 0.587 * g + 0.114 * b;
  },
  
  applyMonochromeFilter: (gray: number, threshold: number = 128) => {
    return gray >= threshold ? "#ffffff" : "#000000";
  }
};
