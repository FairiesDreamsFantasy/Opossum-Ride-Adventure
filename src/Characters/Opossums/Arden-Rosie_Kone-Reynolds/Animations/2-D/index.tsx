/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { ARDEN_ROSIE_COLORS } from "../Color_Palette";

/**
 * Renders Arden-Rosie's 2-D Blueprint model on Canvas
 */
export function drawArdenRosie2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  character: OpossumCharacter
) {
  // Arden-Rosie's elegant cream Flat representation
  ctx.fillStyle = ARDEN_ROSIE_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();
}
