/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 2D vector offset renderer for objects bobbing
 */
export function calculateBobbingOffset(time: number, rate = 0.003, height = 5): number {
  return Math.sin(time * rate) * height;
}
