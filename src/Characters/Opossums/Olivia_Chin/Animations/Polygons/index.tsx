/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OLIVIA_COLOR_PALETTE } from "../Color_Palette";

export function drawOliviaPolygons(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.strokeStyle = OLIVIA_COLOR_PALETTE.furColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(x, y, 38 * 0.62, 22, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x, y - 15, 37 * 0.44, 16, 0, 0, Math.PI * 2);
  ctx.stroke();
}

export default drawOliviaPolygons;
