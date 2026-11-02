/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RUTH_COLOR_PALETTE } from "../Color_Palette";

export function drawRuthPolygons(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.strokeStyle = RUTH_COLOR_PALETTE.furColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(x, y, 45 * 0.62, 24, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x, y - 16, 43.33 * 0.44, 18, 0, 0, Math.PI * 2);
  ctx.stroke();
}

export default drawRuthPolygons;
