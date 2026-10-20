/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { JALISSA_COLORS } from "../Color_Palette";

import { drawEarDiamondPattern } from "../../../../../System/Utilities/Drawing_Utils";

/**
 * Renders Jalissa Chin's 3-D Perspective Model on Canvas.
 * Mathematically precise and scientific implementation.
 */
export function drawJalissa3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  character: OpossumCharacter
) {
  const pWidth = 37.5; // Jalissa has a 37.5-inch scaled body width
  
  ctx.save();

  // 1. Draw Dark-Pink Tail (Winding tail base)
  ctx.strokeStyle = JALISSA_COLORS.tail;
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(px, py + 12);
  ctx.bezierCurveTo(px - 18, py + 28, px - 32, py + 10, px - 42, py + 24);
  ctx.stroke();

  // 2. Body Shape: Yellow-Orange (#ff9933)
  ctx.fillStyle = JALISSA_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.62, 21, 0, 0, Math.PI * 2);
  ctx.fill();

  // Highlight stroke
  ctx.strokeStyle = JALISSA_COLORS.secondary;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // 3. Ears
  ctx.fillStyle = JALISSA_COLORS.earsOuter;
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 9, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 9, 0, Math.PI * 2);
  ctx.fill();

  // Apply cream diamond patterns to outer ears
  drawEarDiamondPattern(ctx, px - 14, py - 18, 9);
  drawEarDiamondPattern(ctx, px + 14, py - 18, 9);

  ctx.fillStyle = JALISSA_COLORS.earsInner;
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 6, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 6, 0, Math.PI * 2);
  ctx.fill();

  // Emerald circular earrings
  ctx.strokeStyle = JALISSA_COLORS.earrings.gold;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(px - 22, py - 14, 4, 0, Math.PI * 2);
  ctx.arc(px + 22, py - 14, 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = JALISSA_COLORS.earrings.emerald;
  ctx.beginPath();
  ctx.arc(px - 22, py - 14, 2.5, 0, Math.PI * 2);
  ctx.arc(px + 22, py - 14, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // 4. Head extension
  ctx.fillStyle = JALISSA_COLORS.head;
  ctx.beginPath();
  ctx.ellipse(px, py - 15, pWidth * 0.44, 13, 0, 0, Math.PI * 2);
  ctx.fill();

  // 5. Pink Tiara with a reflective red heart centerpiece
  ctx.strokeStyle = JALISSA_COLORS.tiara;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 10, py - 23);
  ctx.lineTo(px - 5, py - 27);
  ctx.lineTo(px, py - 31);
  ctx.lineTo(px + 5, py - 27);
  ctx.lineTo(px + 10, py - 23);
  ctx.stroke();

  ctx.fillStyle = JALISSA_COLORS.heart;
  const tx = px;
  const ty = py - 31;
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.bezierCurveTo(tx - 3, ty - 2, tx - 4, ty + 1, tx, ty + 4);
  ctx.bezierCurveTo(tx + 4, ty + 1, tx + 3, ty - 2, tx, ty);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(tx - 1, ty + 0.5, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // 6. Beautiful Dark-Blue Eyes
  ctx.fillStyle = JALISSA_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(px - 7, py - 15, 3, 0, Math.PI * 2);
  ctx.arc(px + 7, py - 15, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(px - 8.2, py - 16.2, 1, 0, Math.PI * 2);
  ctx.arc(px + 5.8, py - 16.2, 1, 0, Math.PI * 2);
  ctx.fill();

  // 7. Nose
  ctx.fillStyle = JALISSA_COLORS.nose;
  ctx.beginPath();
  ctx.arc(px, py - 11, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // 8. Silver Diamond Necklace
  ctx.strokeStyle = JALISSA_COLORS.necklace;
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.arc(px, py - 7, 10, 0.2 * Math.PI, 0.8 * Math.PI, false);
  ctx.stroke();

  ctx.strokeStyle = JALISSA_COLORS.necklace;
  ctx.fillStyle = JALISSA_COLORS.charm;
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(px, py + 2);
  ctx.lineTo(px + 3, py + 5);
  ctx.lineTo(px, py + 8);
  ctx.lineTo(px - 3, py + 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}
