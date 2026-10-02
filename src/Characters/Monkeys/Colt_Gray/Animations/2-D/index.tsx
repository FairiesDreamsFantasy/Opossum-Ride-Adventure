/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COLT_COLORS } from "../Color_Palette";

/**
 * Standard 2-D rendering for Colt Monkey.
 */
export function drawColt2D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  ow: number,
  oh: number
) {
  ctx.fillStyle = COLT_COLORS.fur;
  ctx.beginPath();
  ctx.arc(px, py - oh*0.5, ow*0.3, 0, Math.PI * 2);
  ctx.fill();
}
