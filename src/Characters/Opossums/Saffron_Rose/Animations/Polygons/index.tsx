/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SAFFRON_COLORS } from "../Color_Palette";

/**
 * Draws Saffron's vector polygon wireframe on Canvas
 */
export function drawSaffronPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number
) {
  ctx.strokeStyle = SAFFRON_COLORS.primary;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.65, 26, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(px, py - 27, 24, 18, 0, 0, Math.PI * 2);
  ctx.stroke();
}
