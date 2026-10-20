/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AMARA_COLORS } from "../Color_Palette";

/**
 * Draws Amara's vector polygon wireframe on Canvas
 */
export function drawAmaraPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number
) {
  ctx.strokeStyle = AMARA_COLORS.primary;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(px, py - 15, pWidth * 0.42, 14, 0, 0, Math.PI * 2);
  ctx.stroke();
}
