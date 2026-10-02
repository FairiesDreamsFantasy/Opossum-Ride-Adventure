/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COLT_COLORS } from "../Color_Palette";

/**
 * 3-D Perspective Rendering for Colt Monkey.
 */
export function drawColt3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  ow: number,
  oh: number
) {
  const mx = px - ow * 0.05;
  const bodyY = py - oh * 0.72;
  const headY = py - oh * 0.88;
  const sizeBody = oh * 0.16;
  const sizeHead = oh * 0.1;

  ctx.strokeStyle = "#401b00";
  ctx.lineWidth = 1.2;

  // Tail
  ctx.strokeStyle = COLT_COLORS.shirt;
  ctx.lineWidth = Math.max(1, ow * 0.035);
  ctx.beginPath();
  ctx.moveTo(mx, bodyY);
  ctx.lineTo(mx - ow * 0.12, bodyY + 6);
  ctx.stroke();

  // Body Octagon
  ctx.fillStyle = COLT_COLORS.shirt;
  ctx.beginPath();
  const rB = sizeBody;
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 + Math.PI / 8;
    const bx = mx + Math.cos(angle) * rB;
    const by = bodyY + Math.sin(angle) * rB;
    if (i === 0) ctx.moveTo(bx, by);
    else ctx.lineTo(bx, by);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Pants
  ctx.save();
  ctx.beginPath();
  ctx.rect(mx - rB, bodyY, rB * 2, rB);
  ctx.clip();
  ctx.fillStyle = COLT_COLORS.pants;
  ctx.fillRect(mx - rB, bodyY, rB * 2, rB);
  ctx.restore();
  ctx.stroke();

  // Head Hexagon
  ctx.fillStyle = COLT_COLORS.fur;
  ctx.beginPath();
  const rH = sizeHead;
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const hx = mx + Math.cos(angle) * rH;
    const hy = headY + Math.sin(angle) * rH;
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Snout
  ctx.fillStyle = COLT_COLORS.skin;
  ctx.beginPath();
  ctx.moveTo(mx - rH * 0.6, headY + rH * 0.1);
  ctx.lineTo(mx + rH * 0.6, headY + rH * 0.1);
  ctx.lineTo(mx + rH * 0.4, headY + rH * 0.7);
  ctx.lineTo(mx - rH * 0.4, headY + rH * 0.7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Eyes
  ctx.fillStyle = COLT_COLORS.eyes;
  ctx.fillRect(mx - rH * 0.4 - 1.5, headY - rH * 0.2, 3, 3);
  ctx.fillRect(mx + rH * 0.4 - 1.5, headY - rH * 0.2, 3, 3);
}
