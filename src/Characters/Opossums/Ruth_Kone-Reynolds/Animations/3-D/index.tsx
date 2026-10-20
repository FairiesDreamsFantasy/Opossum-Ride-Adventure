/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RUTH_COLOR_PALETTE } from "../Color_Palette";

export function drawRuth3D(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.save();
  // Pink flexible winding tail
  ctx.strokeStyle = RUTH_COLOR_PALETTE.tailColor;
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 12);
  ctx.bezierCurveTo(x - 24, y + 32, x - 40, y + 12, x - 52, y + 28);
  ctx.stroke();

  // Pink Fur Body (45 in width)
  ctx.fillStyle = RUTH_COLOR_PALETTE.furColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 45 * 0.62, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  // Draw floral accents across the coat
  const flowerOffsets = [
    { dx: -18, dy: -6, color: RUTH_COLOR_PALETTE.flowerColors[0] },
    { dx: -6, dy: 4, color: RUTH_COLOR_PALETTE.flowerColors[1] },
    { dx: 8, dy: -8, color: RUTH_COLOR_PALETTE.flowerColors[2] },
    { dx: 18, dy: 6, color: RUTH_COLOR_PALETTE.flowerColors[9] },
    { dx: -12, dy: 10, color: RUTH_COLOR_PALETTE.flowerColors[12] },
    { dx: 6, dy: 12, color: RUTH_COLOR_PALETTE.flowerColors[17] }
  ];
  flowerOffsets.forEach(fl => {
    ctx.fillStyle = fl.color;
    ctx.beginPath();
    ctx.arc(x + fl.dx, y + fl.dy, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  });

  // Outer Ears (Pink with rainbow diamond hints), Inner Ears (Reddish-brown)
  ctx.fillStyle = RUTH_COLOR_PALETTE.outerEarColor;
  ctx.beginPath();
  ctx.arc(x - 16, y - 20, 10, 0, Math.PI * 2);
  ctx.arc(x + 16, y - 20, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = RUTH_COLOR_PALETTE.innerEarColor;
  ctx.beginPath();
  ctx.arc(x - 16, y - 20, 6.2, 0, Math.PI * 2);
  ctx.arc(x + 16, y - 20, 6.2, 0, Math.PI * 2);
  ctx.fill();

  // Head (43.33 in width, 44.88 in height) - Perched on top of neck, Dark-brown face (0% furry)
  ctx.fillStyle = RUTH_COLOR_PALETTE.faceColor;
  ctx.beginPath();
  ctx.ellipse(x, y - 16, 43.33 * 0.44, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Sky Blue Eyes
  ctx.fillStyle = RUTH_COLOR_PALETTE.eyeColor;
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

  // Light Pink Nose (no nostrils)
  ctx.fillStyle = RUTH_COLOR_PALETTE.noseColor;
  ctx.beginPath();
  ctx.arc(x, y - 21, 5, 0, Math.PI * 2);
  ctx.fill();

  // Accessories: 4-inch Yellow Earrings & Yellow chain necklace with Gold Flower charm
  ctx.strokeStyle = RUTH_COLOR_PALETTE.accessoryColor;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(x - 22, y - 16, 3.5, 0, Math.PI * 2);
  ctx.arc(x + 22, y - 16, 3.5, 0, Math.PI * 2);
  ctx.stroke();

  // Necklace
  ctx.beginPath();
  ctx.arc(x, y - 4, 12, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();
  // Gold Flower Charm
  ctx.fillStyle = RUTH_COLOR_PALETTE.goldCharmColor;
  ctx.beginPath();
  ctx.arc(x, y + 8, 3, 0, Math.PI * 2);
  ctx.fill();

  // Orange Paws
  ctx.fillStyle = RUTH_COLOR_PALETTE.pawColor;
  ctx.beginPath();
  ctx.ellipse(x - 14, y + 22, 5, 3.2, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 14, y + 22, 5, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default drawRuth3D;
