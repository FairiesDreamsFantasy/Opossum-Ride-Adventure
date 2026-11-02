/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { DAGMAR_COLORS } from "../Color_Palette";

import { drawEarDiamondPattern } from "../../../../../System/Utilities/Drawing_Utils";

/**
 * Renders Dagmar's 3-D Perspective Model on Canvas.
 * Uses Ultra-Mathematical and scientific methods for precise geometric definition.
 */
export function drawDagmar3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  character: OpossumCharacter
) {
  const pWidth = 40; // Body width as specified (40 inches)

  // 1. Extended Tail (10% longer for scaled large opossum)
  ctx.strokeStyle = DAGMAR_COLORS.tail;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(px, py + 12);
  ctx.bezierCurveTo(px - 22, py + 33, px - 40, py + 10, px - 55, py + 30);
  ctx.stroke();

  // Silver spiral design on tail
  ctx.save();
  ctx.strokeStyle = DAGMAR_COLORS.tailSpiral;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 10]);
  ctx.beginPath();
  ctx.moveTo(px, py + 12);
  ctx.bezierCurveTo(px - 22, py + 33, px - 40, py + 10, px - 55, py + 30);
  ctx.stroke();
  ctx.restore();

  // 2. Main Body (White with multi-colored diamond pattern)
  ctx.fillStyle = DAGMAR_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Diamond Pattern
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.clip();
  
  const step = 10;
  for (let dx = -30; dx <= 30; dx += step) {
    for (let dy = -15; dy <= 15; dy += step) {
      const colorIdx = Math.abs(dx + dy) % DAGMAR_COLORS.diamonds.length;
      ctx.fillStyle = DAGMAR_COLORS.diamonds[colorIdx];
      ctx.strokeStyle = DAGMAR_COLORS.wireframeGold;
      ctx.lineWidth = 1;
      
      const cx = px + dx;
      const cy = py + dy;
      
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

  // 3. Ears (3% larger, cream outer, pink inner)
  const earSize = 9 * 1.03;
  ctx.fillStyle = DAGMAR_COLORS.earsOuter;
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, earSize, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, earSize, 0, Math.PI * 2);
  ctx.fill();

  // Apply cream diamond patterns to outer ears
  drawEarDiamondPattern(ctx, px - 14, py - 18, earSize);
  drawEarDiamondPattern(ctx, px + 14, py - 18, earSize);

  ctx.fillStyle = DAGMAR_COLORS.earsInner;
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, earSize * 0.65, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, earSize * 0.65, 0, Math.PI * 2);
  ctx.fill();

  // 4. Red Gold Earrings
  ctx.strokeStyle = DAGMAR_COLORS.earrings;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(px - 23, py - 16, 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(px + 23, py - 16, 7, 0, Math.PI * 2);
  ctx.stroke();

  // 5. Head
  ctx.fillStyle = DAGMAR_COLORS.head;
  ctx.beginPath();
  ctx.ellipse(px, py - 18, pWidth * 0.45, 17, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head patterns
  ctx.fillStyle = DAGMAR_COLORS.headPatterns.cream;
  ctx.beginPath();
  ctx.ellipse(px - 8, py - 22, 5, 3, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = DAGMAR_COLORS.headPatterns.orange;
  ctx.beginPath();
  ctx.ellipse(px + 8, py - 22, 5, 3, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = DAGMAR_COLORS.headPatterns.yellow;
  ctx.beginPath();
  ctx.arc(px, py - 25, 4, 0, Math.PI * 2);
  ctx.fill();

  // Face
  ctx.fillStyle = DAGMAR_COLORS.face;
  ctx.beginPath();
  ctx.ellipse(px, py - 18, pWidth * 0.35, 13, 0, 0, Math.PI * 2);
  ctx.fill();

  // 6. Gold Necklace
  ctx.strokeStyle = DAGMAR_COLORS.necklace;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(px, py - 10, 15, 0, Math.PI, false);
  ctx.stroke();

  ctx.fillStyle = DAGMAR_COLORS.charm;
  ctx.beginPath();
  ctx.arc(px, py + 4, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(px - 1.5, py + 3, 1, 0, Math.PI * 2);
  ctx.arc(px + 1.5, py + 5, 1, 0, Math.PI * 2);
  ctx.fill();

  // 7. Light-Green Eyes
  ctx.fillStyle = DAGMAR_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(px - 8, py - 19, 3, 0, Math.PI * 2);
  ctx.arc(px + 8, py - 19, 3, 0, Math.PI * 2);
  ctx.fill();

  // 8. Nose
  ctx.fillStyle = DAGMAR_COLORS.nose;
  ctx.beginPath();
  ctx.arc(px, py - 21, 5, 0, Math.PI * 2);
  ctx.fill();
}
