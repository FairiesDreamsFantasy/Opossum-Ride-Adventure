/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { ASHLEY_COLORS } from "../Color_Palette";

import { drawEarDiamondPattern } from "../../../../../System/Utilities/Drawing_Utils";

/**
 * Renders Ashley's 3-D Perspective Model on Canvas
 */
export function drawAshley3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  character: OpossumCharacter
) {
  const pWidth = 45; // Ashley's robust body frame is wide

  // Tail
  ctx.strokeStyle = ASHLEY_COLORS.tail;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(px, py + 12);
  ctx.bezierCurveTo(px - 20, py + 30, px - 35, py + 10, px - 45, py + 25);
  ctx.stroke();

  // Outer Vibrant Yellow Body
  ctx.fillStyle = ASHLEY_COLORS.secondary;
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ears (Now matches primary fur color with diamond pattern)
  ctx.fillStyle = ASHLEY_COLORS.earsOuter;
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 9, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 9, 0, Math.PI * 2);
  ctx.fill();

  // Apply cream diamond patterns to outer ears
  drawEarDiamondPattern(ctx, px - 14, py - 18, 9);
  drawEarDiamondPattern(ctx, px + 14, py - 18, 9);

  ctx.fillStyle = ASHLEY_COLORS.earsInner; // Red-orange fiery inner ears
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 6, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 6, 0, Math.PI * 2);
  ctx.fill();

  // Head extension - forward leaning posture
  ctx.fillStyle = ASHLEY_COLORS.head;
  ctx.beginPath();
  ctx.ellipse(px, py - 15, pWidth * 0.42, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Vibrant light green eyes
  ctx.fillStyle = ASHLEY_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(px - 8, py - 17, 3, 0, Math.PI * 2);
  ctx.arc(px + 8, py - 17, 3, 0, Math.PI * 2);
  ctx.fill();

  // Nose (Pink tip)
  ctx.fillStyle = ASHLEY_COLORS.nose;
  ctx.beginPath();
  ctx.arc(px, py - 20, 5, 0, Math.PI * 2);
  ctx.fill();
}
