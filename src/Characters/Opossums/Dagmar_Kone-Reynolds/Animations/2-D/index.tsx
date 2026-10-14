/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { DAGMAR_COLORS } from "../Color_Palette";

/**
 * Renders Dagmar's 2-D Blueprint model on Canvas
 */
export function drawDagmar2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  character: OpossumCharacter
) {
  // Dagmar's elegant white Flat representation
  ctx.fillStyle = DAGMAR_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();
}
