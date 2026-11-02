/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedurally generates an elegant striped canvas pattern for render styles
 */
export function createStripedPattern(
  ctx: CanvasRenderingContext2D,
  color1 = "#15803d",
  color2 = "#166534"
): CanvasPattern | null {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const pctx = canvas.getContext("2d");
  if (!pctx) return null;

  pctx.fillStyle = color1;
  pctx.fillRect(0, 0, 16, 16);
  pctx.fillStyle = color2;
  pctx.beginPath();
  pctx.moveTo(0, 16);
  pctx.lineTo(16, 0);
  pctx.lineTo(8, 0);
  pctx.lineTo(0, 8);
  pctx.fill();
  pctx.beginPath();
  pctx.moveTo(8, 16);
  pctx.lineTo(16, 8);
  pctx.lineTo(16, 16);
  pctx.fill();

  return ctx.createPattern(canvas, "repeat");
}
