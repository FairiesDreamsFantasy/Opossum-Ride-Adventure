/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { AMARA_COLORS } from "../Color_Palette";

/**
 * Renders Amara Qin's 2-D Blueprint model on Canvas
 */
export function drawAmara2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  character: OpossumCharacter
) {
  // Amara Qin has custom white body flat representation
  ctx.fillStyle = AMARA_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();
}
