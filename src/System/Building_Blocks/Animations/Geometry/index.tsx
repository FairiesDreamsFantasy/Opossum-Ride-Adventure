/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Custom geometric grid checkerboard drawer for flooring layers
 */
export function drawTileGridGeometry(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  cols: number,
  rows: number,
  color1 = "rgba(255,255,255,0.05)",
  color2 = "rgba(0,0,0,0.05)"
) {
  ctx.save();
  const cellW = width / cols;
  const cellH = height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? color1 : color2;
      ctx.fillRect(x + c * cellW, y + r * cellH, cellW, cellH);
    }
  }
  ctx.restore();
}
