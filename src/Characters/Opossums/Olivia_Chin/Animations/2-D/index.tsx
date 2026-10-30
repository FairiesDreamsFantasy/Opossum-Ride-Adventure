/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OLIVIA_COLOR_PALETTE } from "../Color_Palette";

export function drawOlivia2D(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.fillStyle = OLIVIA_COLOR_PALETTE.furColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();
}

export default drawOlivia2D;
