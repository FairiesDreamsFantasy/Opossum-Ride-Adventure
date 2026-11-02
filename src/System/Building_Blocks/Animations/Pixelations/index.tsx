/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural pixelated brick texture drawer for retro wall/floor blocks
 */
export function drawPixelatedBrick(
  ctx: CanvasRenderingContext2D,
  bx: number,
  by: number,
  width: number,
  height: number,
  brickColor = "#78350f",
  groutColor = "#451a03",
  pixelSize = 4
) {
  ctx.save();
  // Fill background with grout
  ctx.fillStyle = groutColor;
  ctx.fillRect(bx, by, width, height);

  // Fill bricks leaving pixel grout spacing
  ctx.fillStyle = brickColor;
  for (let y = pixelSize; y < height - pixelSize; y += pixelSize * 3) {
    const shift = Math.floor((y / (pixelSize * 3)) % 2) * (pixelSize * 2);
    for (let x = pixelSize; x < width - pixelSize; x += pixelSize * 5) {
      const bxLoc = bx + ((x + shift) % (width - pixelSize));
      ctx.fillRect(bxLoc, by + y, pixelSize * 4, pixelSize * 2);
    }
  }

  ctx.restore();
}
