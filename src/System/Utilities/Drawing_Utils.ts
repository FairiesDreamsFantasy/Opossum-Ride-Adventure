/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Draws a grid of diamond patterns within a circular clipping area (the ear).
 */
export function drawEarDiamondPattern(
  ctx: CanvasRenderingContext2D,
  ex: number,
  ey: number,
  radius: number,
  color: string = "#fff7ed"
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(ex, ey, radius, 0, Math.PI * 2);
  ctx.clip();

  const diamondSize = 4; // 1cm approx in scaled coordinates
  const spacing = 1; // 0.25cm approx
  const step = diamondSize + spacing;

  ctx.fillStyle = color;
  for (let ox = -radius - step; ox < radius + step; ox += step) {
    for (let oy = -radius - step; oy < radius + step; oy += step) {
      const px = ex + ox + (oy % (2 * step) === 0 ? step / 2 : 0);
      const py = ey + oy;

      ctx.beginPath();
      ctx.moveTo(px, py - diamondSize / 2);
      ctx.lineTo(px + diamondSize / 2, py);
      ctx.lineTo(px, py + diamondSize / 2);
      ctx.lineTo(px - diamondSize / 2, py);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.restore();
}

/**
 * Draws a grid of polka dots within a circular clipping area (the ear).
 */
export function drawEarPolkaDotPattern(
  ctx: CanvasRenderingContext2D,
  ex: number,
  ey: number,
  radius: number,
  color: string = "#facc15"
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(ex, ey, radius, 0, Math.PI * 2);
  ctx.clip();

  const dotDiameter = 2.5; // 0.25in approx
  const spacing = 5; // 0.5in approx
  const step = dotDiameter + spacing;

  ctx.fillStyle = color;
  for (let ox = -radius - step; ox < radius + step; ox += step) {
    for (let oy = -radius - step; oy < radius + step; oy += step) {
      const px = ex + ox + (oy % (2 * step) === 0 ? step / 2 : 0);
      const py = ey + oy;

      ctx.beginPath();
      ctx.arc(px, py, dotDiameter / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}
