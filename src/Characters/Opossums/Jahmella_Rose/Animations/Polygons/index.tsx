/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JAHMELLA_COLORS } from "../Color_Palette";

/**
 * Draws Jahmella's vector polygon wireframe on Canvas
 */
export function drawJahmellaPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number
) {
  ctx.strokeStyle = JAHMELLA_COLORS.primary;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 25, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(px, py - 22, pWidth * 0.45, 18, 0, 0, Math.PI * 2);
  ctx.stroke();
}
