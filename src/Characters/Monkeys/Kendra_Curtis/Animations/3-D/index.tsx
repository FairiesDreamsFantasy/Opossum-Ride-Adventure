/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KENDRA_CURTIS_COLORS } from "../../Color_Palette";

export function drawKendraCurtis3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  ow: number,
  oh: number
) {
  const mx = px;
  const bodyY = py - oh * 0.65;
  const headY = py - oh * 0.85;

  // Tailored White Pencil Dress
  ctx.fillStyle = KENDRA_CURTIS_COLORS.dress;
  ctx.beginPath();
  ctx.moveTo(mx - ow * 0.16, bodyY - oh * 0.1);
  ctx.lineTo(mx + ow * 0.16, bodyY - oh * 0.1);
  ctx.lineTo(mx + ow * 0.12, bodyY + oh * 0.35);
  ctx.lineTo(mx - ow * 0.12, bodyY + oh * 0.35);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#CBD5E1";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Legs with Gold Stockings over White Pantyhose
  ctx.fillStyle = KENDRA_CURTIS_COLORS.stockingsTopLayer;
  ctx.fillRect(mx - ow * 0.11, bodyY + oh * 0.35, ow * 0.08, oh * 0.25);
  ctx.fillRect(mx + ow * 0.03, bodyY + oh * 0.35, ow * 0.08, oh * 0.25);

  // Royal Purple High Heels
  ctx.fillStyle = KENDRA_CURTIS_COLORS.highHeels;
  ctx.beginPath();
  ctx.rect(mx - ow * 0.13, bodyY + oh * 0.6, ow * 0.11, oh * 0.04);
  ctx.rect(mx + ow * 0.01, bodyY + oh * 0.6, ow * 0.11, oh * 0.04);
  ctx.fill();

  // Head with Peach Skin
  ctx.fillStyle = KENDRA_CURTIS_COLORS.skinTone;
  ctx.beginPath();
  ctx.arc(mx, headY, ow * 0.14, 0, Math.PI * 2);
  ctx.fill();

  // Brilliant Blond Hair
  ctx.fillStyle = KENDRA_CURTIS_COLORS.hair;
  ctx.beginPath();
  ctx.arc(mx, headY - 4, ow * 0.16, Math.PI, Math.PI * 2);
  ctx.fill();

  // Emerald Green Eyes
  ctx.fillStyle = KENDRA_CURTIS_COLORS.eyes;
  ctx.fillRect(mx - 5, headY - 2, 3, 3);
  ctx.fillRect(mx + 2, headY - 2, 3, 3);

  // Gold Cross Pendant
  ctx.fillStyle = KENDRA_CURTIS_COLORS.crossPendant;
  ctx.fillRect(mx - 1.5, bodyY - oh * 0.08, 3, 10);
  ctx.fillRect(mx - 5, bodyY - oh * 0.05, 10, 3);
}
