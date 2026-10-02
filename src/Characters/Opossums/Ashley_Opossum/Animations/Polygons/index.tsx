/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { ASHLEY_COLORS } from "../Color_Palette";

/**
 * Draws Ashley's vector polygon wireframe on Canvas
 */
export function drawAshleyPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number
) {
  ctx.strokeStyle = ASHLEY_COLORS.primary;
  ctx.lineWidth = 1.5;

  // Body polygon
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Head polygon
  ctx.beginPath();
  ctx.ellipse(px, py - 15, pWidth * 0.42, 14, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Polygon nose vector
  ctx.beginPath();
  ctx.moveTo(px - 2, py - 17);
  ctx.lineTo(px, py - 20);
  ctx.lineTo(px + 2, py - 17);
  ctx.closePath();
  ctx.stroke();
}
