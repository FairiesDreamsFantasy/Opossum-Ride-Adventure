/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COLT_COLORS } from "../Color_Palette";

/**
 * Draws Colt's vector polygon wireframe on Canvas
 */
export function drawColtPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  ow: number,
  oh: number
) {
  ctx.strokeStyle = COLT_COLORS.wireframe;
  ctx.lineWidth = 1;
  ctx.strokeRect(px - ow / 2, py - oh, ow, oh);
}
