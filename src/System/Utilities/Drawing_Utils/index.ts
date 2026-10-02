/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function drawEarDiamondPattern(ctx: CanvasRenderingContext2D, x: number, y: number, size: number = 5, color: string = "#ffffff") {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size, y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawEarPolkaDotPattern(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number = 3, color: string = "#ffffff") {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
