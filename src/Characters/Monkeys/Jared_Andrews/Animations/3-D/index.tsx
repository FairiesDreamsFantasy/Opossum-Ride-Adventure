/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JARED_COLORS } from "../Color_Palette";

/**
 * 3-D Perspective Rendering for Jared Monkey.
 */
export function drawJared3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  ow: number,
  oh: number
) {
  const mx = px;
  const bodyY = py - oh * 0.7;
  const headY = py - oh * 0.85;
  const rB = oh * 0.15;
  const rH = oh * 0.1;

  // Body
  ctx.fillStyle = JARED_COLORS.overalls;
  ctx.fillRect(mx - rB, bodyY - rB, rB * 2, rB * 2);
  
  // Head
  ctx.fillStyle = JARED_COLORS.fur;
  ctx.beginPath();
  ctx.arc(mx, headY, rH, 0, Math.PI * 2);
  ctx.fill();

  // Cap
  ctx.fillStyle = JARED_COLORS.cap;
  ctx.fillRect(mx - rH, headY - rH - 2, rH * 2, 4);
}
