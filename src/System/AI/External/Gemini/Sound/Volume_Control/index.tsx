/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Volume state and dynamic gain mapping limits.
 */
export const SoundVolumeControl = {
  /**
   * Applies logarithmic scaling to a raw slider percentage (0 to 1) for natural auditory perception.
   * Standard audio formula: y = x ^ 2
   */
  getLogarithmicVolume(percentage: number): number {
    const clamped = Math.max(0, Math.min(1, percentage));
    return parseFloat((clamped * clamped).toFixed(4));
  }
};
