/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WANDA_COLOR_PALETTE } from "../Color_Palette";

export function drawWandaPolygons(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.strokeStyle = WANDA_COLOR_PALETTE.furColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(x, y, 36 * 0.62, 22, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x, y - 15, 35.9999 * 0.44, 15, 0, 0, Math.PI * 2);
  ctx.stroke();
}

export default drawWandaPolygons;
