/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SANDRA_COLOR_PALETTE } from "../Color_Palette";

export function drawSandra3D(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.save();
  // Pink winding tail (8% longer)
  ctx.strokeStyle = SANDRA_COLOR_PALETTE.tailColor;
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 12);
  ctx.bezierCurveTo(x - 26, y + 34, x - 44, y + 14, x - 58, y + 30);
  ctx.stroke();

  // Lavender Body (38 in width)
  ctx.fillStyle = SANDRA_COLOR_PALETTE.furColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 38 * 0.62, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  // Outer Ears (Lavender)
  ctx.fillStyle = SANDRA_COLOR_PALETTE.outerEarColor;
  ctx.beginPath();
  ctx.arc(x - 14, y - 20, 9.5, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 20, 9.5, 0, Math.PI * 2);
  ctx.fill();

  // Inner Ears (Pink)
  ctx.fillStyle = SANDRA_COLOR_PALETTE.innerEarColor;
  ctx.beginPath();
  ctx.arc(x - 14, y - 20, 6.0, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 20, 6.0, 0, Math.PI * 2);
  ctx.fill();

  // Head (36 in width, 36 in height) - Light Brown face skin
  ctx.fillStyle = SANDRA_COLOR_PALETTE.faceColor;
  ctx.beginPath();
  ctx.ellipse(x, y - 16, 36 * 0.44, 16.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dark-Blue Eyes
  ctx.fillStyle = SANDRA_COLOR_PALETTE.eyeColor;
  ctx.beginPath();
  ctx.arc(x - 8, y - 17, 3.2, 0, Math.PI * 2);
  ctx.arc(x + 8, y - 17, 3.2, 0, Math.PI * 2);
  ctx.fill();

  // Eye highlights
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x - 9, y - 18, 1, 0, Math.PI * 2);
  ctx.arc(x + 7, y - 18, 1, 0, Math.PI * 2);
  ctx.fill();

  // Pink Nose (no nostrils, 3% longer snout factor)
  ctx.fillStyle = SANDRA_COLOR_PALETTE.noseColor;
  ctx.beginPath();
  ctx.arc(x, y - 21.5, 5, 0, Math.PI * 2);
  ctx.fill();

  // Light-Pink Paws
  ctx.fillStyle = SANDRA_COLOR_PALETTE.pawColor;
  ctx.beginPath();
  ctx.ellipse(x - 13, y + 22, 5, 3.2, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 13, y + 22, 5, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default drawSandra3D;
