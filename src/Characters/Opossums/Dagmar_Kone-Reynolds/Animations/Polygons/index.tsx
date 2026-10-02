/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DAGMAR_COLORS } from "../Color_Palette";

/**
 * Draws Dagmar's vector polygon wireframe on Canvas
 */
export function drawDagmarPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number
) {
  ctx.strokeStyle = DAGMAR_COLORS.primary;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(px, py - 18, pWidth * 0.45, 17, 0, 0, Math.PI * 2);
  ctx.stroke();
}
