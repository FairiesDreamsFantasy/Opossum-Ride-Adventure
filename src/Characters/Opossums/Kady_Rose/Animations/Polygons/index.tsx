/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KADY_COLOR_PALETTE } from "../Color_Palette";

export function drawKadyPolygons(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.strokeStyle = KADY_COLOR_PALETTE.furColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(x, y, 48 * 0.62, 24, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x, y - 16, 47.5 * 0.44, 18, 0, 0, Math.PI * 2);
  ctx.stroke();
}

export default drawKadyPolygons;
