/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { MELISSA_COLORS } from "../Color_Palette";

/**
 * Renders Melissa's 2-D Blueprint model on Canvas
 */
export function drawMelissa2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  character: OpossumCharacter
) {
  // Melissa has custom Light gray body flat representation
  ctx.fillStyle = MELISSA_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();
}
