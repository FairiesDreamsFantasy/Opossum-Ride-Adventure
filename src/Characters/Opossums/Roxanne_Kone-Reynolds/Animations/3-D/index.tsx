/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { ROXANNE_COLORS } from "../Color_Palette";
import { drawEarDiamondPattern } from "../../../../../System/Utilities/Drawing_Utils";

export function drawRoxanne3D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  _width?: number,
  _height?: number,
  _character?: OpossumCharacter
) {
  ctx.save();
  // 1. Tail (Pink with 0.0001% yellow fur - rendered as plain pink for now)
  ctx.strokeStyle = ROXANNE_COLORS.tail;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(plX, plY + 12);
  ctx.bezierCurveTo(plX - 20, plY + 30, plX - 35, plY + 10, plX - 45, plY + 25);
  ctx.stroke();

  // 2. Yellow body with perched neck head orientation
  ctx.fillStyle = ROXANNE_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(plX, plY, 22, 29, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body Diamond Pattern (multi-colored with red-orange borders)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(plX, plY, 22, 29, 0, 0, Math.PI * 2);
  ctx.clip();
  const step = 10;
  for (let dx = -25; dx <= 25; dx += step) {
    for (let dy = -30; dy <= 30; dy += step) {
      const colorIdx = Math.abs(dx + dy) % ROXANNE_COLORS.diamonds.length;
      ctx.fillStyle = ROXANNE_COLORS.diamonds[colorIdx];
      ctx.strokeStyle = ROXANNE_COLORS.diamondBorder;
      ctx.lineWidth = 1;
      const cx = plX + dx;
      const cy = plY + dy;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 3.5);
      ctx.lineTo(cx + 3.5, cy);
      ctx.lineTo(cx, cy + 3.5);
      ctx.lineTo(cx - 3.5, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
  ctx.restore();

  // 3. Ears (Yellow outer, Pinkish-brown inner)
  const earSize = 9;
  ctx.fillStyle = ROXANNE_COLORS.primary;
  ctx.beginPath();
  ctx.arc(plX - 14, plY - 22, earSize, 0, Math.PI * 2);
  ctx.arc(plX + 14, plY - 22, earSize, 0, Math.PI * 2);
  ctx.fill();

  // Red Diamonds on outer ears
  drawEarDiamondPattern(ctx, plX - 14, plY - 22, earSize, "#dc2626");
  drawEarDiamondPattern(ctx, plX + 14, plY - 22, earSize, "#dc2626");

  ctx.fillStyle = ROXANNE_COLORS.innerEar;
  ctx.beginPath();
  ctx.arc(plX - 14, plY - 22, earSize * 0.65, 0, Math.PI * 2);
  ctx.arc(plX + 14, plY - 22, earSize * 0.65, 0, Math.PI * 2);
  ctx.fill();

  // 4. Red paws mutation rendering
  ctx.fillStyle = ROXANNE_COLORS.paws;
  ctx.beginPath();
  ctx.arc(plX - 12, plY + 20, 3.5, 0, Math.PI * 2);
  ctx.arc(plX + 12, plY + 20, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // 5. Red diamond heart necklace
  ctx.fillStyle = "#dc2626";
  ctx.beginPath();
  ctx.arc(plX, plY - 14, 3, 0, Math.PI * 2);
  ctx.fill();

  // 6. Face/Eyes/Nose
  ctx.fillStyle = ROXANNE_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(plX - 6, plY - 24, 2.5, 0, Math.PI * 2);
  ctx.arc(plX + 6, plY - 24, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = ROXANNE_COLORS.nose;
  ctx.beginPath();
  ctx.arc(plX, plY - 26, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
