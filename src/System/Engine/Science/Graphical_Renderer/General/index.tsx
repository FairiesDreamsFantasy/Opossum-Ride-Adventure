/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const RENDER_CONSTANTS = {
  MIN_ZOOM: 0.1,
  MAX_ZOOM: 10.0,
  DEFAULT_SCALE: 1.0,
  ASPECT_RATIO: 16 / 9
};

export function translateCoordinate(val: number, offset: number, scale: number): number {
  return (val + offset) * scale;
}
