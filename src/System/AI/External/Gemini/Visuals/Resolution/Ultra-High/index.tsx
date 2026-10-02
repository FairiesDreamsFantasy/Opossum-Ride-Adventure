/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ULTRA_HIGH_RESOLUTION_CONSTANTS } from "./General";

/**
 * Ultra High resolution calculations.
 */
export const ResolutionUltraHigh = {
  getUltraHighDimensions(width: number, height: number): { w: number; h: number } {
    return {
      w: Math.round(width * ULTRA_HIGH_RESOLUTION_CONSTANTS.SCALE_FACTOR),
      h: Math.round(height * ULTRA_HIGH_RESOLUTION_CONSTANTS.SCALE_FACTOR)
    };
  }
};

export default ResolutionUltraHigh;
export * from "./General";
