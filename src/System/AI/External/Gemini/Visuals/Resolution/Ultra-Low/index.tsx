/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ULTRA_LOW_RESOLUTION_CONSTANTS } from "./General";

/**
 * Ultra Low resolution optimization calculations.
 */
export const ResolutionUltraLow = {
  getUltraLowDimensions(width: number, height: number): { w: number; h: number } {
    return {
      w: Math.max(ULTRA_LOW_RESOLUTION_CONSTANTS.MIN_WIDTH, Math.round(width * ULTRA_LOW_RESOLUTION_CONSTANTS.SCALE_FACTOR)),
      h: Math.max(ULTRA_LOW_RESOLUTION_CONSTANTS.MIN_HEIGHT, Math.round(height * ULTRA_LOW_RESOLUTION_CONSTANTS.SCALE_FACTOR))
    };
  }
};

export default ResolutionUltraLow;
export * from "./General";
