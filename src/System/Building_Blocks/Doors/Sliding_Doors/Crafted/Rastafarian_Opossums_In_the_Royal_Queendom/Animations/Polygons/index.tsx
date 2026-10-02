/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const RASTAFARIAN_ROYAL_QUEENDOM_POLYGONS = {
  doorLeafQuad: (x: number, y: number, width: number, height: number) => [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height }
  ]
};

export default RASTAFARIAN_ROYAL_QUEENDOM_POLYGONS;
