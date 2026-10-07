/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { ASHLEY_COLORS } from "../Color_Palette";

/**
 * Renders Ashley's 2-D Blueprint model on Canvas
 */
export function drawAshley2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  character: OpossumCharacter
) {
  // Ashley's robust golden Flat representation
  ctx.fillStyle = ASHLEY_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();
}
