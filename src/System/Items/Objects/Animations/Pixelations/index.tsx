/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * High performance downsampling pixel grid rendering utility
 */
export function drawPixelatedObject(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  size: number,
  pixelSize = 4,
  color = "#22c55e"
) {
  ctx.save();
  ctx.fillStyle = color;
  const half = size / 2;
  for (let x = -half; x < half; x += pixelSize) {
    for (let y = -half; y < half; y += pixelSize) {
      if ((x * x + y * y) < half * half) {
        ctx.fillRect(px + x, py + y, pixelSize, pixelSize);
      }
    }
  }
  ctx.restore();
}
