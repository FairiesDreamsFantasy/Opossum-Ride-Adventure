/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { ROXANNE_COLORS } from "../Color_Palette";

export function drawRoxanne3D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  _width?: number,
  _height?: number,
  _character?: OpossumCharacter
) {
  ctx.save();
  // Yellow body with perched neck head orientation
  ctx.fillStyle = ROXANNE_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 19, 29, 0, 0, Math.PI * 2);
  ctx.fill();

  // Red paws mutation rendering
  ctx.fillStyle = ROXANNE_COLORS.paws;
  ctx.beginPath();
  ctx.arc(plX - 12, plY + 20, 3.5, 0, Math.PI * 2);
  ctx.arc(plX + 12, plY + 20, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Red diamond heart necklace
  ctx.fillStyle = "#dc2626";
  ctx.beginPath();
  ctx.arc(plX, plY - 14, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
