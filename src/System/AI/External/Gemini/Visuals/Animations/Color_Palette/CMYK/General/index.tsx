/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CMYKColor {
  c: number; // Cyan: 0 to 1
  m: number; // Magenta: 0 to 1
  y: number; // Yellow: 0 to 1
  k: number; // Key (Black): 0 to 1
}

export const CMYK_CONSTANTS = {
  MIN_VALUE: 0,
  MAX_VALUE: 1
};
