/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KENDRA_CURTIS_COLORS } from "../../Color_Palette";

export function drawKendraCurtisPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  ow: number,
  oh: number
) {
  ctx.strokeStyle = KENDRA_CURTIS_COLORS.highHeels;
  ctx.lineWidth = 1.2;
  ctx.strokeRect(px - ow * 0.2, py - oh * 0.9, ow * 0.4, oh * 0.9);
}
