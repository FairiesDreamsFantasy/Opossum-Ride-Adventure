/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JALISSA_COLORS } from "../Color_Palette";

/**
 * Draws Jalissa's vector polygon wireframe on Canvas
 */
export function drawJalissaPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number
) {
  ctx.strokeStyle = JALISSA_COLORS.primary;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.62, 21, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(px, py - 15, pWidth * 0.44, 13, 0, 0, Math.PI * 2);
  ctx.stroke();
}
