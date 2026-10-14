/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SILVER_TEA_ROOM_POLYGONS = {
  glassWindowQuad: (x: number, y: number, w: number, h: number) => [
    { x, y },
    { x: x + w, y },
    { x: x + w, y: y + h },
    { x, y: y + h }
  ]
};

export default SILVER_TEA_ROOM_POLYGONS;
