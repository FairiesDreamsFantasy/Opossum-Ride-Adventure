/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function drawJosephPixelations(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  const pixelSize = Math.max(3, Math.floor(w / 20));
  ctx.fillStyle = "#ffffff";
  
  // Pixel block core
  for (let r = -6; r <= 2; r++) {
    for (let c = -5; c <= 5; c++) {
      if (Math.abs(r) + Math.abs(c) < 9) {
        ctx.fillRect(x + c * pixelSize, y + r * pixelSize - h * 0.4, pixelSize - 1, pixelSize - 1);
      }
    }
  }

  // Antler pixel blocks
  ctx.fillStyle = "#fef3c7";
  ctx.fillRect(x - 6 * pixelSize, y - 9 * pixelSize - h * 0.4, pixelSize * 2, pixelSize);
  ctx.fillRect(x + 4 * pixelSize, y - 9 * pixelSize - h * 0.4, pixelSize * 2, pixelSize);

  ctx.restore();
}
