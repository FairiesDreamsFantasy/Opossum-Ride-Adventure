/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Geometric distance and boundary check helpers for rendering optimizations
 */
export function isPointInCircle(
  x: number,
  y: number,
  cx: number,
  cy: number,
  radius: number
): boolean {
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= radius * radius;
}

export function drawGeometricBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  lineWidth = 1.5,
  strokeColor = "#16a34a"
) {
  ctx.save();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, width, height);
  ctx.restore();
}
