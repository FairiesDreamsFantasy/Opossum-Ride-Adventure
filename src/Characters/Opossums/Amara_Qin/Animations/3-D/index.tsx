/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { AMARA_COLORS } from "../Color_Palette";

import { drawEarDiamondPattern } from "../../../../../System/Utilities/Drawing_Utils";

/**
 * Renders Amara Qin's 3-D Perspective Model on Canvas
 */
export function drawAmara3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  character: OpossumCharacter
) {
  const pWidth = 40; // Scaled representation based on 36 inches width

  // Pink flexible/winding tail
  ctx.strokeStyle = AMARA_COLORS.tail;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(px, py + 12);
  ctx.bezierCurveTo(px - 20, py + 30, px - 35, py + 10, px - 45, py + 25);
  ctx.stroke();

  // Majestic White Body
  ctx.fillStyle = AMARA_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dark border around majestic body to keep high contrast visibility on bright backgrounds
  ctx.strokeStyle = AMARA_COLORS.accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Ears (Now matches primary fur color with diamond pattern)
  ctx.fillStyle = AMARA_COLORS.earsOuter;
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 9, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 9, 0, Math.PI * 2);
  ctx.fill();

  // Apply cream diamond patterns to outer ears
  drawEarDiamondPattern(ctx, px - 14, py - 18, 9);
  drawEarDiamondPattern(ctx, px + 14, py - 18, 9);

  ctx.fillStyle = AMARA_COLORS.earsInner; // Pink inner ears
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 6, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 6, 0, Math.PI * 2);
  ctx.fill();

  // Head extension - elegant head perched gracefully on top of her neck
  ctx.fillStyle = AMARA_COLORS.head;
  ctx.beginPath();
  ctx.ellipse(px, py - 15, pWidth * 0.42, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Beautiful blue eyes
  ctx.fillStyle = AMARA_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(px - 8, py - 17, 3, 0, Math.PI * 2);
  ctx.arc(px + 8, py - 17, 3, 0, Math.PI * 2);
  ctx.fill();

  // Nose (Pink tip, no nostrils)
  ctx.fillStyle = AMARA_COLORS.nose;
  ctx.beginPath();
  ctx.arc(px, py - 20, 5, 0, Math.PI * 2);
  ctx.fill();
}
