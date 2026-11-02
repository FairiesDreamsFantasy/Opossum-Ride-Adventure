/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Draw flat 2D barrier with simple outline and fill
 */
export function drawBarrier2D(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fillColor = "#1f2937",
  borderColor = "#111827"
) {
  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1.5;
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
  ctx.restore();
}
