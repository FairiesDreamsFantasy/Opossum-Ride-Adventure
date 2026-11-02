/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KADY_COLOR_PALETTE } from "../Color_Palette";

export function drawKady2D(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.fillStyle = KADY_COLOR_PALETTE.furColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 18, 28, 0, 0, Math.PI * 2);
  ctx.fill();
}

export default drawKady2D;
