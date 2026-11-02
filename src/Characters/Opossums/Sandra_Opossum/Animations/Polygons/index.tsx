/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SANDRA_COLOR_PALETTE } from "../Color_Palette";

export function drawSandraPolygons(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.strokeStyle = SANDRA_COLOR_PALETTE.furColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(x, y, 38 * 0.62, 24, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x, y - 16, 36 * 0.44, 16.5, 0, 0, Math.PI * 2);
  ctx.stroke();
}

export default drawSandraPolygons;
