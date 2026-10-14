/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RUTH_COLOR_PALETTE } from "../Color_Palette";

export function drawRuth2D(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.fillStyle = RUTH_COLOR_PALETTE.furColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 18, 28, 0, 0, Math.PI * 2);
  ctx.fill();
}

export default drawRuth2D;
