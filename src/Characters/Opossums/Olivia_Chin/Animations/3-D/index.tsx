/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OLIVIA_COLOR_PALETTE } from "../Color_Palette";

export function drawOlivia3D(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.save();
  // Reddish-brown tail
  ctx.strokeStyle = OLIVIA_COLOR_PALETTE.tailColor;
  ctx.lineWidth = 4.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 12);
  ctx.bezierCurveTo(x - 20, y + 30, x - 35, y + 10, x - 45, y + 25);
  ctx.stroke();

  // Blond Fur Body (38 in width)
  ctx.fillStyle = OLIVIA_COLOR_PALETTE.furColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 38 * 0.62, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = OLIVIA_COLOR_PALETTE.furAccent;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Blond Outer Ears, Reddish-brown Inner Ears
  ctx.fillStyle = OLIVIA_COLOR_PALETTE.outerEarColor;
  ctx.beginPath();
  ctx.arc(x - 14, y - 18, 9, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 18, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = OLIVIA_COLOR_PALETTE.innerEarColor;
  ctx.beginPath();
  ctx.arc(x - 14, y - 18, 5.8, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 18, 5.8, 0, Math.PI * 2);
  ctx.fill();

  // Head (37 in width, 42 in height) - Light-brown skin, 0.00001% furry
  ctx.fillStyle = OLIVIA_COLOR_PALETTE.faceColor;
  ctx.beginPath();
  ctx.ellipse(x, y - 15, 37 * 0.44, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // Indigo Eyes
  ctx.fillStyle = OLIVIA_COLOR_PALETTE.eyeColor;
  ctx.beginPath();
  ctx.arc(x - 8, y - 16, 3.2, 0, Math.PI * 2);
  ctx.arc(x + 8, y - 16, 3.2, 0, Math.PI * 2);
  ctx.fill();

  // Eye highlights
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x - 9, y - 17, 1, 0, Math.PI * 2);
  ctx.arc(x + 7, y - 17, 1, 0, Math.PI * 2);
  ctx.fill();

  // Reddish-Brown Nose (no nostrils)
  ctx.fillStyle = OLIVIA_COLOR_PALETTE.noseColor;
  ctx.beginPath();
  ctx.arc(x, y - 19, 4.8, 0, Math.PI * 2);
  ctx.fill();

  // Saffron Paws
  ctx.fillStyle = OLIVIA_COLOR_PALETTE.pawColor;
  ctx.beginPath();
  ctx.ellipse(x - 12, y + 20, 4.5, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 12, y + 20, 4.5, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default drawOlivia3D;
