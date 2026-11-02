/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GEORGE_COLORS } from "../Color_Palette";

/**
 * Procedural 3D Canvas Mesh Renderer for George riding atop an opossum.
 */
export function renderGeorge3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  scale: number = 1
) {
  ctx.save();
  ctx.translate(px, py);
  ctx.scale(scale, scale);

  // Lower body / molded onesie seat
  ctx.fillStyle = GEORGE_COLORS.onesieBase;
  ctx.beginPath();
  ctx.ellipse(0, -10, 9, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Torso
  ctx.fillStyle = "#D4982B";
  ctx.fillRect(-7, -30, 14, 14);

  // Hexagon pattern cross-hatching
  ctx.strokeStyle = GEORGE_COLORS.hexagonBorder;
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  for (let hx = -6; hx <= 6; hx += 3.5) {
    for (let hy = -29; hy <= -18; hy += 3.5) {
      ctx.strokeRect(hx - 1, hy - 1, 2.5, 2.5);
    }
  }

  // Honey skin head
  ctx.fillStyle = GEORGE_COLORS.skin;
  ctx.beginPath();
  ctx.arc(0, -38, 7, 0, Math.PI * 2);
  ctx.fill();

  // Black dreadlocks
  ctx.fillStyle = GEORGE_COLORS.hair;
  ctx.beginPath();
  ctx.arc(0, -41, 7.5, Math.PI, Math.PI * 2);
  ctx.fill();

  // Red Rastafari Crown atop head
  ctx.fillStyle = GEORGE_COLORS.crown;
  ctx.beginPath();
  ctx.moveTo(-5, -44);
  ctx.lineTo(-6, -49);
  ctx.lineTo(-2, -46);
  ctx.lineTo(0, -50);
  ctx.lineTo(2, -46);
  ctx.lineTo(6, -49);
  ctx.lineTo(5, -44);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = GEORGE_COLORS.crownTrim;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Green vegetation shoes
  ctx.fillStyle = GEORGE_COLORS.shoes;
  ctx.fillRect(-8, -2, 5, 4);
  ctx.fillRect(3, -2, 5, 4);

  ctx.restore();
}
