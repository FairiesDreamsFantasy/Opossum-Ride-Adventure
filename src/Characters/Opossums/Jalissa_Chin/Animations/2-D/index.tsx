/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { JALISSA_COLORS } from "../Color_Palette";

/**
 * Renders Jalissa Chin's 2-D Blueprint model on Canvas
 */
export function drawJalissa2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  character: OpossumCharacter
) {
  // Jalissa Chin has custom Yellow-Orange body flat representation
  ctx.fillStyle = JALISSA_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();
}
