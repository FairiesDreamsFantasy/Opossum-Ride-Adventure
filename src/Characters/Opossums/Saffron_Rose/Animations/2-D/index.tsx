/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { SAFFRON_COLORS } from "../Color_Palette";

/**
 * Renders Saffron Rose's 2-D Blueprint model on Canvas
 */
export function drawSaffron2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  character: OpossumCharacter
) {
  // Saffron Rose has custom Red-Orange body flat representation
  ctx.fillStyle = SAFFRON_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 17, 28, 0, 0, Math.PI * 2);
  ctx.fill();
}
