/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KENDRA_CURTIS_COLORS } from "../../Color_Palette";

export function drawKendraCurtis2D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  ow: number,
  oh: number
) {
  // Head & Blond Hair
  ctx.fillStyle = KENDRA_CURTIS_COLORS.hair;
  ctx.beginPath();
  ctx.arc(px, py - oh * 0.85, ow * 0.22, 0, Math.PI * 2);
  ctx.fill();

  // Peach Skin Face
  ctx.fillStyle = KENDRA_CURTIS_COLORS.skinTone;
  ctx.beginPath();
  ctx.arc(px, py - oh * 0.82, ow * 0.16, 0, Math.PI * 2);
  ctx.fill();

  // White Pencil Dress Torso
  ctx.fillStyle = KENDRA_CURTIS_COLORS.dress;
  ctx.fillRect(px - ow * 0.14, py - oh * 0.65, ow * 0.28, oh * 0.4);

  // Gold Stockings Legs
  ctx.fillStyle = KENDRA_CURTIS_COLORS.stockingsTopLayer;
  ctx.fillRect(px - ow * 0.12, py - oh * 0.25, ow * 0.08, oh * 0.22);
  ctx.fillRect(px + ow * 0.04, py - oh * 0.25, ow * 0.08, oh * 0.22);

  // Purple High Heels
  ctx.fillStyle = KENDRA_CURTIS_COLORS.highHeels;
  ctx.fillRect(px - ow * 0.14, py - oh * 0.04, ow * 0.11, oh * 0.04);
  ctx.fillRect(px + ow * 0.03, py - oh * 0.04, ow * 0.11, oh * 0.04);
}
