/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * High resolution supersampling utilities.
 */
export const ResolutionHigh = {
  /**
   * Computes supersampling scaling factors (e.g. SSAO or SSAA render dimensions).
   */
  getSupersampledDimensions(width: number, height: number, factor: number = 2): { w: number; h: number } {
    return {
      w: Math.round(width * factor),
      h: Math.round(height * factor)
    };
  }
};
