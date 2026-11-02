/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural checkerboard pattern generator for custom tile flooring
 */
export function createCheckerPattern(
  ctx: CanvasRenderingContext2D,
  color1 = "#f97316",
  color2 = "#7c3aed"
): CanvasPattern | null {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const pctx = canvas.getContext("2d");
  if (!pctx) return null;

  pctx.fillStyle = color1;
  pctx.fillRect(0, 0, 32, 32);

  pctx.fillStyle = color2;
  pctx.fillRect(0, 0, 16, 16);
  pctx.fillRect(16, 16, 16, 16);

  return ctx.createPattern(canvas, "repeat");
}
