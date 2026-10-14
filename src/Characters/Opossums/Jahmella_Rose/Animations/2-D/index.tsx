/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { JAHMELLA_COLORS } from "../Color_Palette";

/**
 * Renders Jahmella Rose's 2-D Blueprint model on Canvas
 */
export function drawJahmellaRose2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  character: OpossumCharacter
) {
  // Jahmella's elegant orange Flat representation
  ctx.fillStyle = JAHMELLA_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 16, 26, 0, 0, Math.PI * 2);
  ctx.fill();
}
