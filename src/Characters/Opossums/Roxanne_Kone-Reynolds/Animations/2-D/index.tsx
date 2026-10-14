/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { ROXANNE_COLORS } from "../Color_Palette";

export function drawRoxanne2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  _character: OpossumCharacter
) {
  // Yellow body flat representation with red paws and diamond pattern
  ctx.fillStyle = ROXANNE_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 17, 27, 0, 0, Math.PI * 2);
  ctx.fill();

  // Draw diamond accent
  ctx.fillStyle = ROXANNE_COLORS.diamonds[0];
  ctx.strokeStyle = ROXANNE_COLORS.diamondBorder;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(plX, plY - 8);
  ctx.lineTo(plX + 5, plY);
  ctx.lineTo(plX, plY + 8);
  ctx.lineTo(plX - 5, plY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
