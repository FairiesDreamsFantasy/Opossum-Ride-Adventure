/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General helper functions and utilities for the Spawner Engine module.
 */
export const SpawnerGeneral = {
  /**
   * Safe check for coordinates within level distance boundaries.
   */
  isWithinBounds: (z: number, targetDistance: number, buffer: number = 91.44): boolean => {
    return z >= buffer && z <= targetDistance - buffer;
  }
};
