/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ARDEN_ROSIE_COLORS } from "../Color_Palette";

/**
 * Draws Arden-Rosie's vector polygon wireframe on Canvas
 */
export function drawArdenRosiePolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number
) {
  ctx.strokeStyle = ARDEN_ROSIE_COLORS.primary;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(px, py - 18, pWidth * 0.42, 16, 0, 0, Math.PI * 2);
  ctx.stroke();
}
