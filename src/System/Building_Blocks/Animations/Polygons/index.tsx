/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedurally draws a polyline or path representing a chain-link fence or custom barrier
 */
export function drawPolylineFence(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  strokeColor = "#475569",
  lineWidth = 2
) {
  if (points.length < 2) return;
  ctx.save();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.restore();
}
