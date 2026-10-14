/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { TIANA_COLORS } from "../Color_Palette";

export function drawTiana2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  _character: OpossumCharacter
) {
  // Red body flat representation with gold paws
  ctx.fillStyle = TIANA_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Gold paws
  ctx.fillStyle = TIANA_COLORS.paws;
  ctx.beginPath();
  ctx.arc(plX - 10, plY + 18, 3, 0, Math.PI * 2);
  ctx.arc(plX + 10, plY + 18, 3, 0, Math.PI * 2);
  ctx.fill();
}
