/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function drawJosephPolygons(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 1.2;

  // Torso polygon
  ctx.beginPath();
  ctx.moveTo(x - w * 0.42, y - h * 0.2);
  ctx.lineTo(x + w * 0.42, y - h * 0.2);
  ctx.lineTo(x + w * 0.32, y - h * 0.82);
  ctx.lineTo(x - w * 0.32, y - h * 0.82);
  ctx.closePath();
  ctx.stroke();

  // Head polygon
  ctx.beginPath();
  ctx.moveTo(x - w * 0.22, y - h * 0.82);
  ctx.lineTo(x - w * 0.42, y - h * 1.02);
  ctx.lineTo(x, y - h * 1.02);
  ctx.closePath();
  ctx.stroke();

  // Antler polygon
  ctx.beginPath();
  ctx.moveTo(x - w * 0.15, y - h * 0.95);
  ctx.lineTo(x - w * 0.5, y - h * 1.2);
  ctx.lineTo(x + w * 0.3, y - h * 1.2);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}
