/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { MELISSA_COLORS } from "../Color_Palette";

import { drawEarDiamondPattern } from "../../../../../System/Utilities/Drawing_Utils";

/**
 * Renders Melissa's 3-D Perspective Model on Canvas
 */
export function drawMelissa3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  character: OpossumCharacter
) {
  const pWidth = 40; // Melissa is sleek, 40-inch scaled width

  // Body
  ctx.strokeStyle = MELISSA_COLORS.tail; // Pink flexible tail/winding tail base
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(px, py + 12);
  ctx.bezierCurveTo(px - 20, py + 30, px - 35, py + 10, px - 45, py + 25);
  ctx.stroke();

  // Outer Gray Body
  ctx.fillStyle = MELISSA_COLORS.primary; // Sleek Light Gray #D3D3D3
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.6, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ears (Light gray outer, pink inner)
  ctx.fillStyle = MELISSA_COLORS.earsOuter; // Now same as primary
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 9, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 9, 0, Math.PI * 2);
  ctx.fill();

  // Apply cream diamond patterns to outer ears
  drawEarDiamondPattern(ctx, px - 14, py - 18, 9);
  drawEarDiamondPattern(ctx, px + 14, py - 18, 9);

  ctx.fillStyle = MELISSA_COLORS.earsInner; // Pink inner ears
  ctx.beginPath();
  ctx.arc(px - 14, py - 18, 6, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 18, 6, 0, Math.PI * 2);
  ctx.fill();

  // Head extension - elegant head perched on her neck
  ctx.fillStyle = MELISSA_COLORS.head;
  ctx.beginPath();
  ctx.ellipse(px, py - 15, pWidth * 0.42, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Beautiful blue eyes
  ctx.fillStyle = MELISSA_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(px - 8, py - 17, 3, 0, Math.PI * 2);
  ctx.arc(px + 8, py - 17, 3, 0, Math.PI * 2);
  ctx.fill();

  // Nose (Pink tip)
  ctx.fillStyle = MELISSA_COLORS.nose;
  ctx.beginPath();
  ctx.arc(px, py - 20, 5, 0, Math.PI * 2);
  ctx.fill();
}
