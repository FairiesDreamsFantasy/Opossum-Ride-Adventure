/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { ARDEN_ROSIE_COLORS } from "../Color_Palette";

import { drawEarDiamondPattern } from "../../../../../System/Utilities/Drawing_Utils";

/**
 * Renders Arden-Rosie's 3-D Perspective Model on Canvas.
 * Uses Mathematical (elliptical/arc) drawing methods with sophisticated diamond patterns.
 */
export function drawArdenRosie3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  character: OpossumCharacter
) {
  const pWidth = 45; // Sturdy body width similar to Ashley

  // 1. Tail (3% thicker than Ashley's which is 4) -> ~4.12
  ctx.strokeStyle = ARDEN_ROSIE_COLORS.tail;
  ctx.lineWidth = 4.12;
  ctx.beginPath();
  ctx.moveTo(px, py + 12);
  ctx.bezierCurveTo(px - 20, py + 30, px - 35, py + 10, px - 45, py + 25);
  ctx.stroke();

  // 2. Main Body (Cream color)
  ctx.fillStyle = ARDEN_ROSIE_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Diamond Pattern Overlay (Mathematical grid)
  const step = 8;
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.clip();
  
  for (let dx = -30; dx <= 30; dx += step) {
    for (let dy = -15; dy <= 15; dy += step) {
      const colorIdx = Math.abs(dx + dy) % ARDEN_ROSIE_COLORS.diamonds.length;
      ctx.fillStyle = ARDEN_ROSIE_COLORS.diamonds[colorIdx];
      ctx.strokeStyle = "#374151"; // Dark-gray borders
      ctx.lineWidth = 0.5;
      
      const cx = px + dx;
      const cy = py + dy;
      
      ctx.beginPath();
      ctx.moveTo(cx, cy - 3);
      ctx.lineTo(cx + 3, cy);
      ctx.lineTo(cx, cy + 3);
      ctx.lineTo(cx - 3, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
  ctx.restore();

  // 4. Ears (Dark-Pink inner ears)
  ctx.fillStyle = ARDEN_ROSIE_COLORS.earsOuter;
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 9, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 9, 0, Math.PI * 2);
  ctx.fill();

  // Apply cream diamond patterns to outer ears
  drawEarDiamondPattern(ctx, px - 14, py - 18, 9);
  drawEarDiamondPattern(ctx, px + 14, py - 18, 9);

  ctx.fillStyle = ARDEN_ROSIE_COLORS.earsInner;
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 6, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 6, 0, Math.PI * 2);
  ctx.fill();

  // 5. Gold Earrings (Exquisite circles)
  ctx.strokeStyle = ARDEN_ROSIE_COLORS.earrings;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(px - 22, py - 15, 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(px + 22, py - 15, 3, 0, Math.PI * 2);
  ctx.stroke();

  // 6. Head (Peach Face, Furry)
  ctx.fillStyle = ARDEN_ROSIE_COLORS.head;
  ctx.beginPath();
  ctx.ellipse(px, py - 18, pWidth * 0.42, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // Furry face accents
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(px - 10 + i * 2.5, py - 25);
    ctx.lineTo(px - 12 + i * 2.5, py - 28);
    ctx.stroke();
  }

  // 7. Light-Blue Eyes
  ctx.fillStyle = ARDEN_ROSIE_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(px - 8, py - 19, 3, 0, Math.PI * 2);
  ctx.arc(px + 8, py - 19, 3, 0, Math.PI * 2);
  ctx.fill();

  // 8. Nose (Dark-Pink, no nostrils)
  ctx.fillStyle = ARDEN_ROSIE_COLORS.nose;
  ctx.beginPath();
  ctx.arc(px, py - 22, 5, 0, Math.PI * 2);
  ctx.fill();
}
