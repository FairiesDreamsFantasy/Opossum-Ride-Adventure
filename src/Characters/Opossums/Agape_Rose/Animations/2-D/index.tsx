/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { AGAPE_COLORS } from "../Color_Palette";

/**
 * Renders Agape Rose's 2-D Blueprint model on Canvas
 */
export function drawAgape2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  _character: OpossumCharacter
) {
  // Gold body flat representation with pink circle accents
  ctx.fillStyle = AGAPE_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 16, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pink circles with purple border
  ctx.fillStyle = AGAPE_COLORS.circlePattern;
  ctx.strokeStyle = AGAPE_COLORS.circleBorder;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(plX - 5, plY - 5, 4, 0, Math.PI * 2);
  ctx.arc(plX + 5, plY + 5, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}
