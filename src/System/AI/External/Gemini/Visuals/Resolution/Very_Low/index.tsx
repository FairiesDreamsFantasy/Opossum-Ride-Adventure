/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VERY_LOW_RESOLUTION_CONSTANTS } from "./General";

/**
 * Very Low resolution optimization calculations.
 */
export const ResolutionVeryLow = {
  getVeryLowDimensions(width: number, height: number): { w: number; h: number } {
    return {
      w: Math.max(VERY_LOW_RESOLUTION_CONSTANTS.MIN_WIDTH, Math.round(width * VERY_LOW_RESOLUTION_CONSTANTS.SCALE_FACTOR)),
      h: Math.max(VERY_LOW_RESOLUTION_CONSTANTS.MIN_HEIGHT, Math.round(height * VERY_LOW_RESOLUTION_CONSTANTS.SCALE_FACTOR))
    };
  }
};

export default ResolutionVeryLow;
export * from "./General";
