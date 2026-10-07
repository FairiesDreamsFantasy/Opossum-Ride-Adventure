/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WANDA_COLOR_PALETTE } from "../Color_Palette";

export function drawWanda2D(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.fillStyle = WANDA_COLOR_PALETTE.furColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();
}

export default drawWanda2D;
