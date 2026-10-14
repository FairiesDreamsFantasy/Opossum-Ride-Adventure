/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function drawTianaPolygons(ctx: CanvasRenderingContext2D, x: number, y: number, _pWidth?: number) {
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.moveTo(x, y - 20);
  ctx.lineTo(x + 15, y + 15);
  ctx.lineTo(x - 15, y + 15);
  ctx.closePath();
  ctx.fill();
}
