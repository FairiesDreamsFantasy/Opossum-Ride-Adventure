/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ANGELA_COLORS } from "../Color_Palette";

/**
 * Procedural 3D Canvas Mesh Renderer for Angela riding atop an opossum.
 */
export function renderAngela3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  scale: number = 1
) {
  ctx.save();
  ctx.translate(px, py);
  ctx.scale(scale, scale);

  // Expansive Cinderella gown base
  ctx.fillStyle = ANGELA_COLORS.dress;
  ctx.beginPath();
  ctx.ellipse(0, -14, 15, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = ANGELA_COLORS.dressShadow;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Pink apron overlay
  ctx.fillStyle = ANGELA_COLORS.apron;
  ctx.beginPath();
  ctx.ellipse(0, -13, 8, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dignified bodice
  ctx.fillStyle = ANGELA_COLORS.onesieBase;
  ctx.fillRect(-9, -44, 18, 17);

  // Peach skin head (6'8" tall stature)
  ctx.fillStyle = ANGELA_COLORS.skin;
  ctx.beginPath();
  ctx.arc(0, -52, 8, 0, Math.PI * 2);
  ctx.fill();

  // Flowing red hair
  ctx.fillStyle = ANGELA_COLORS.hair;
  ctx.beginPath();
  ctx.arc(0, -55, 8.5, Math.PI * 0.85, Math.PI * 2.15);
  ctx.fill();
  ctx.fillRect(-10, -54, 3, 14);
  ctx.fillRect(7, -54, 3, 14);

  // Gold tiara
  ctx.fillStyle = ANGELA_COLORS.tiara;
  ctx.beginPath();
  ctx.moveTo(-6, -58);
  ctx.lineTo(0, -63);
  ctx.lineTo(6, -58);
  ctx.lineTo(5, -56);
  ctx.lineTo(-5, -56);
  ctx.closePath();
  ctx.fill();

  // Diamond-shaped red shiny gem
  ctx.fillStyle = ANGELA_COLORS.gem;
  ctx.beginPath();
  ctx.moveTo(0, -62);
  ctx.lineTo(2, -60);
  ctx.lineTo(0, -58);
  ctx.lineTo(-2, -60);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
