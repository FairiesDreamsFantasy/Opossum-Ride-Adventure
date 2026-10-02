/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RGBColor {
  r: number; // 0 to 255
  g: number; // 0 to 255
  b: number; // 0 to 255
}

export const RGB_CONSTANTS = {
  MAX_CHANNEL: 255,
  MIN_CHANNEL: 0,
  GAMMA: 2.2
};
