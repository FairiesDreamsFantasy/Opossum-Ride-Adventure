/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { JAHMELLA_COLORS } from "../Color_Palette";

import { drawEarDiamondPattern } from "../../../../../System/Utilities/Drawing_Utils";

/**
 * Renders Jahmella Rose's 3-D Perspective Model on Canvas.
 * Uses Ultra-Mathematical and scientific methods for precise geometric definition.
 */
export function drawJahmellaRose3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  character: OpossumCharacter
) {
  const pWidth = 40; // Body width as specified

  // 1. Extended Tail (+20% length, +5% thickness)
  ctx.strokeStyle = JAHMELLA_COLORS.tail;
  ctx.lineWidth = 4.2;
  ctx.beginPath();
  ctx.moveTo(px, py + 12);
  ctx.bezierCurveTo(px - 25, py + 35, px - 45, py + 5, px - 60, py + 30);
  ctx.stroke();

  // Gold spiral design on tail
  ctx.save();
  ctx.strokeStyle = JAHMELLA_COLORS.tailSpiral;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 12]);
  ctx.beginPath();
  ctx.moveTo(px, py + 12);
  ctx.bezierCurveTo(px - 25, py + 35, px - 45, py + 5, px - 60, py + 30);
  ctx.stroke();
  ctx.restore();

  // 2. Main Body (Orange with White spotted circles)
  ctx.fillStyle = JAHMELLA_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spotted pattern
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 25, 0, 0, Math.PI * 2);
  ctx.clip();
  
  const step = 14;
  for (let dx = -30; dx <= 30; dx += step) {
    for (let dy = -20; dy <= 20; dy += step) {
      const cx = px + dx + (dy % step === 0 ? 5 : 0);
      const cy = py + dy;
      
      ctx.fillStyle = JAHMELLA_COLORS.spots;
      ctx.strokeStyle = JAHMELLA_COLORS.spotBorder;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
  ctx.restore();

  // 3. Paws (White)
  ctx.fillStyle = JAHMELLA_COLORS.paws;
  ctx.beginPath();
  ctx.ellipse(px - 15, py + 22, 5, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(px + 15, py + 22, 5, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // 4. Ears (Red-Orange inner)
  ctx.fillStyle = JAHMELLA_COLORS.earsOuter;
  ctx.beginPath();
  ctx.arc(px - 14, py - 20, 10, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 20, 10, 0, Math.PI * 2);
  ctx.fill();

  // Apply cream diamond patterns to outer ears
  drawEarDiamondPattern(ctx, px - 14, py - 20, 10);
  drawEarDiamondPattern(ctx, px + 14, py - 20, 10);

  ctx.fillStyle = JAHMELLA_COLORS.earsInner;
  ctx.beginPath();
  ctx.arc(px - 14, py - 20, 7, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 20, 7, 0, Math.PI * 2);
  ctx.fill();

  // 5. Silver Earrings
  ctx.strokeStyle = JAHMELLA_COLORS.earrings;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(px - 24, py - 18, 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(px + 24, py - 18, 7, 0, Math.PI * 2);
  ctx.stroke();

  // 6. Head (Tan with olive undertone, Perched on neck)
  ctx.fillStyle = JAHMELLA_COLORS.head;
  ctx.beginPath();
  ctx.ellipse(px, py - 22, pWidth * 0.45, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // 7. Light-Green Eyes
  ctx.fillStyle = JAHMELLA_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(px - 9, py - 23, 3.5, 0, Math.PI * 2);
  ctx.arc(px + 9, py - 23, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // 8. Nose (Red-Orange, no nostrils)
  ctx.fillStyle = JAHMELLA_COLORS.nose;
  ctx.beginPath();
  ctx.arc(px, py - 26, 6, 0, Math.PI * 2);
  ctx.fill();
}
