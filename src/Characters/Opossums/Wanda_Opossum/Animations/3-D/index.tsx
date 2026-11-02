/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WANDA_COLOR_PALETTE } from "../Color_Palette";

export function drawWanda3D(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.save();
  // Red flexible winding tail
  ctx.strokeStyle = WANDA_COLOR_PALETTE.tailColor;
  ctx.lineWidth = 4.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 12);
  ctx.bezierCurveTo(x - 20, y + 30, x - 35, y + 10, x - 45, y + 25);
  ctx.stroke();

  // Light Amber Fur Body
  ctx.fillStyle = WANDA_COLOR_PALETTE.furColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 36 * 0.62, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = WANDA_COLOR_PALETTE.furAccent;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Light-Amber Outer Ears, Reddish-brown Inner Ears (3.5% larger for scale)
  const earOuterR = 9 * 1.035;
  ctx.fillStyle = WANDA_COLOR_PALETTE.outerEarColor;
  ctx.beginPath();
  ctx.arc(x - 14, y - 18, earOuterR, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 18, earOuterR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = WANDA_COLOR_PALETTE.innerEarColor;
  ctx.beginPath();
  ctx.arc(x - 14, y - 18, earOuterR * 0.65, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 18, earOuterR * 0.65, 0, Math.PI * 2);
  ctx.fill();

  // Head - perched on top of her neck, Dark-brown face skin
  ctx.fillStyle = WANDA_COLOR_PALETTE.faceColor;
  ctx.beginPath();
  ctx.ellipse(x, y - 15, 35.9999 * 0.44, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Indigo Eyes
  ctx.fillStyle = WANDA_COLOR_PALETTE.eyeColor;
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

  // Red Nose (5% shorter snout)
  ctx.fillStyle = WANDA_COLOR_PALETTE.noseColor;
  ctx.beginPath();
  ctx.arc(x, y - 20, 5, 0, Math.PI * 2);
  ctx.fill();

  // Saffron Paws
  ctx.fillStyle = WANDA_COLOR_PALETTE.pawColor;
  ctx.beginPath();
  ctx.ellipse(x - 12, y + 20, 4.5, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 12, y + 20, 4.5, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default drawWanda3D;
