/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Mary's riding geometry offsets.
 * Calculated for her 6'3" stature to ensure zero clipping on large opossums.
 */
export const MARY_GEOMETRY = {
  ridingOffset: {
    y: 1.25, // Higher seat offset due to leg length
    z: -0.15  // Forward lean adjustment
  },
  legSpan: 0.85,
  armReach: 0.7
};
