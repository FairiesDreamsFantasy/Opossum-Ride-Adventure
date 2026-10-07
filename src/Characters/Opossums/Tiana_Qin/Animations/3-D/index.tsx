/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { TIANA_COLORS } from "../Color_Palette";

export function drawTiana3D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  _width?: number,
  _height?: number,
  _character?: OpossumCharacter
) {
  ctx.save();
  // Red fur body with perched neck head orientation
  ctx.fillStyle = TIANA_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 18, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  // Gold paws
  ctx.fillStyle = TIANA_COLORS.paws;
  ctx.beginPath();
  ctx.arc(plX - 11, plY + 19, 3.5, 0, Math.PI * 2);
  ctx.arc(plX + 11, plY + 19, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Green Earrings (4 inch diameter visual scale)
  ctx.strokeStyle = TIANA_COLORS.earrings;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(plX - 12, plY - 10, 4, 0, Math.PI * 2);
  ctx.arc(plX + 12, plY - 10, 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}
