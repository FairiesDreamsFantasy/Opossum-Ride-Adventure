/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VERY_HIGH_RESOLUTION_CONSTANTS } from "./General";

/**
 * Very High resolution calculations.
 */
export const ResolutionVeryHigh = {
  getVeryHighDimensions(width: number, height: number): { w: number; h: number } {
    return {
      w: Math.round(width * VERY_HIGH_RESOLUTION_CONSTANTS.SCALE_FACTOR),
      h: Math.round(height * VERY_HIGH_RESOLUTION_CONSTANTS.SCALE_FACTOR)
    };
  }
};

export default ResolutionVeryHigh;
export * from "./General";
