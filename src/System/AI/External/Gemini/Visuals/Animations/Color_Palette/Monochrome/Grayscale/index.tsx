/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Precision grayscale luminance mapping formulas.
 */
export const GrayscalePalette = {
  // ITU-R BT.601 coefficients (SDTV)
  BT601: {
    r: 0.299,
    g: 0.587,
    b: 0.114
  },
  // ITU-R BT.709 coefficients (HDTV)
  BT709: {
    r: 0.2126,
    g: 0.7152,
    b: 0.0722
  },
  // Simple average method
  Average: {
    r: 0.333,
    g: 0.333,
    b: 0.333
  },
  /**
   * Translates RGB into custom luma value
   */
  getLuminance: (r: number, g: number, b: number, formula: "BT601" | "BT709" | "Average" = "BT709"): number => {
    const coeff = GrayscalePalette[formula];
    return coeff.r * r + coeff.g * g + coeff.b * b;
  }
};

export default GrayscalePalette;
