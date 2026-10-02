/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function drawRoxannePolygons(ctx: CanvasRenderingContext2D, x: number, y: number, _pWidth?: number) {
  ctx.fillStyle = "#facc15";
  ctx.beginPath();
  ctx.moveTo(x, y - 22);
  ctx.lineTo(x + 16, y + 16);
  ctx.lineTo(x - 16, y + 16);
  ctx.closePath();
  ctx.fill();
}
