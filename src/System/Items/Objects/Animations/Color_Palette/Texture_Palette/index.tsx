/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedurally generates an elegant wood/moss noise texture pattern
 */
export function createNoiseTexturePattern(
  ctx: CanvasRenderingContext2D,
  color = "#78350f",
  density = 0.15
): CanvasPattern | null {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const pctx = canvas.getContext("2d");
  if (!pctx) return null;

  pctx.fillStyle = color;
  pctx.fillRect(0, 0, 32, 32);

  pctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  for (let i = 0; i < 32 * 32 * density; i++) {
    const rx = Math.floor(Math.random() * 32);
    const ry = Math.floor(Math.random() * 32);
    pctx.fillRect(rx, ry, 1, 1);
  }

  pctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  for (let i = 0; i < 32 * 32 * (density / 2); i++) {
    const rx = Math.floor(Math.random() * 32);
    const ry = Math.floor(Math.random() * 32);
    pctx.fillRect(rx, ry, 1, 1);
  }

  return ctx.createPattern(canvas, "repeat");
}
