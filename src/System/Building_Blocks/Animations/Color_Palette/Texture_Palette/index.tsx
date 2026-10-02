/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural slate/stone texture pattern generator
 */
export function createStoneTexturePattern(
  ctx: CanvasRenderingContext2D,
  color = "#334155"
): CanvasPattern | null {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const pctx = canvas.getContext("2d");
  if (!pctx) return null;

  pctx.fillStyle = color;
  pctx.fillRect(0, 0, 64, 64);

  // Simple elegant cracks / noise
  pctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
  pctx.lineWidth = 1;
  pctx.beginPath();
  pctx.moveTo(0, 10);
  pctx.lineTo(20, 25);
  pctx.lineTo(40, 20);
  pctx.lineTo(64, 45);
  pctx.stroke();

  pctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  pctx.beginPath();
  pctx.moveTo(0, 12);
  pctx.lineTo(20, 27);
  pctx.lineTo(40, 22);
  pctx.lineTo(64, 47);
  pctx.stroke();

  return ctx.createPattern(canvas, "repeat");
}
