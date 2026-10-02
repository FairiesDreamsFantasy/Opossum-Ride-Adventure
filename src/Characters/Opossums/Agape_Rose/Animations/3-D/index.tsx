/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { AGAPE_COLORS } from "../Color_Palette";

export function drawAgape3D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  _width?: number,
  _height?: number,
  _character?: OpossumCharacter
) {
  // Gold body with 3D gradient, forward head orientation, white gold tiara
  ctx.save();
  ctx.fillStyle = AGAPE_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 18, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  // White Gold Tiara with moon gem on top of head
  ctx.strokeStyle = AGAPE_COLORS.tiara;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(plX, plY - 22, 6, Math.PI, 0);
  ctx.stroke();

  // Circular white moon gem
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(plX, plY - 25, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
