/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KADY_COLOR_PALETTE } from "../Color_Palette";

export function drawKady3D(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.save();
  // Red-Orange winding tail
  ctx.strokeStyle = KADY_COLOR_PALETTE.tailColor;
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 12);
  ctx.bezierCurveTo(x - 24, y + 32, x - 40, y + 12, x - 52, y + 28);
  ctx.stroke();

  // Light Gray Body (48 in width)
  ctx.fillStyle = KADY_COLOR_PALETTE.furColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 48 * 0.62, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  // Outer Ears (Light Gray with 1.5 cm bronze circles)
  ctx.fillStyle = KADY_COLOR_PALETTE.outerEarColor;
  ctx.beginPath();
  ctx.arc(x - 16, y - 20, 10, 0, Math.PI * 2);
  ctx.arc(x + 16, y - 20, 10, 0, Math.PI * 2);
  ctx.fill();

  // Bronze circles on outer ears
  ctx.fillStyle = KADY_COLOR_PALETTE.earCircleColor;
  ctx.beginPath();
  ctx.arc(x - 18, y - 22, 2.5, 0, Math.PI * 2);
  ctx.arc(x + 18, y - 22, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Inner Ears (Reddish-brown)
  ctx.fillStyle = KADY_COLOR_PALETTE.innerEarColor;
  ctx.beginPath();
  ctx.arc(x - 16, y - 20, 6.2, 0, Math.PI * 2);
  ctx.arc(x + 16, y - 20, 6.2, 0, Math.PI * 2);
  ctx.fill();

  // Head (47.5 in width, 46 in height) - Dark-brown face skin
  ctx.fillStyle = KADY_COLOR_PALETTE.faceColor;
  ctx.beginPath();
  ctx.ellipse(x, y - 16, 47.5 * 0.44, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Light-Green Eyes
  ctx.fillStyle = KADY_COLOR_PALETTE.eyeColor;
  ctx.beginPath();
  ctx.arc(x - 9, y - 17, 3.4, 0, Math.PI * 2);
  ctx.arc(x + 9, y - 17, 3.4, 0, Math.PI * 2);
  ctx.fill();

  // Eye highlights
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x - 10, y - 18, 1, 0, Math.PI * 2);
  ctx.arc(x + 8, y - 18, 1, 0, Math.PI * 2);
  ctx.fill();

  // Red-Orange Nose (no nostrils)
  ctx.fillStyle = KADY_COLOR_PALETTE.noseColor;
  ctx.beginPath();
  ctx.arc(x, y - 21, 5, 0, Math.PI * 2);
  ctx.fill();

  // Accessories: Gold 3-inch earrings & red necklace with pink heart-shaped charm
  ctx.strokeStyle = KADY_COLOR_PALETTE.earringColor;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(x - 22, y - 16, 3.2, 0, Math.PI * 2);
  ctx.arc(x + 22, y - 16, 3.2, 0, Math.PI * 2);
  ctx.stroke();

  // Red necklace
  ctx.strokeStyle = KADY_COLOR_PALETTE.necklaceColor;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(x, y - 4, 12, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();

  // Pink Heart Charm
  ctx.fillStyle = KADY_COLOR_PALETTE.heartCharmColor;
  ctx.beginPath();
  ctx.arc(x - 1.5, y + 8, 2, 0, Math.PI * 2);
  ctx.arc(x + 1.5, y + 8, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - 3.5, y + 8.5);
  ctx.lineTo(x, y + 12);
  ctx.lineTo(x + 3.5, y + 8.5);
  ctx.fill();

  // Saffron Paws
  ctx.fillStyle = KADY_COLOR_PALETTE.pawColor;
  ctx.beginPath();
  ctx.ellipse(x - 14, y + 22, 5, 3.2, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 14, y + 22, 5, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default drawKady3D;
