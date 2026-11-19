/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../types";

export const IvanOpossumAnimations = {
  gallopRate: 1.25,
  earTwitchIntervalMs: 3000,
  tailSwayAngleDeg: 12
};

/**
 * Renders Ivan Opossum's 2-D Blueprint model on Canvas (Pink coat with 48 vertical brown stripes)
 */
export function drawIvan2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  _character?: OpossumCharacter
) {
  ctx.save();
  // Pink base body scaled for compact Jack (28 in width)
  ctx.fillStyle = "#FFC0CB";
  ctx.beginPath();
  ctx.ellipse(plX, plY, 13, 21, 0, 0, Math.PI * 2);
  ctx.fill();

  // Subtle vertical brown stripe markings visible in 2D blueprint
  ctx.strokeStyle = "#5C3D2E";
  ctx.lineWidth = 0.7;
  for (let i = -8; i <= 8; i += 2) {
    ctx.beginPath();
    ctx.moveTo(plX + i, plY - 14);
    ctx.lineTo(plX + i, plY + 14);
    ctx.stroke();
  }

  // Red nose tip
  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.arc(plX, plY - 21, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Renders Ivan Opossum's 3-D Perspective Model on Canvas
 */
export function drawIvan3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  _width: number,
  _height: number,
  _character?: OpossumCharacter
) {
  ctx.save();
  const pWidth = 28; // Ivan body width: 28 inches

  // Red Tail
  ctx.strokeStyle = "#DC2626";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(px, py + 11);
  ctx.bezierCurveTo(px - 18, py + 26, px - 30, py + 8, px - 38, py + 20);
  ctx.stroke();

  // Natural Paws (Match natural opossum)
  ctx.fillStyle = "#D2B48C";
  ctx.beginPath();
  ctx.arc(px - 12, py + 18, 4.5, 0, Math.PI * 2);
  ctx.arc(px + 12, py + 18, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Torso (Pink base coat)
  ctx.fillStyle = "#FFC0CB";
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.68, 19, 0, 0, Math.PI * 2);
  ctx.fill();

  // 48 Vertical Brown Stripes clipped to torso ellipse
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.68, 19, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = "#5C3D2E";
  ctx.lineWidth = 0.65;
  const rx = pWidth * 0.68;
  for (let i = 0; i < 48; i++) {
    const sx = px - rx + (i + 0.5) * ((rx * 2) / 48);
    ctx.beginPath();
    ctx.moveTo(sx, py - 20);
    ctx.lineTo(sx, py + 20);
    ctx.stroke();
  }
  ctx.restore();

  // Ears: Black outer, Dark-brown inner (Standard for real opossums)
  ctx.fillStyle = "#121212";
  ctx.beginPath();
  ctx.arc(px - 12, py - 15, 7.5, 0, Math.PI * 2);
  ctx.arc(px + 12, py - 15, 7.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#3E2723";
  ctx.beginPath();
  ctx.arc(px - 12, py - 15, 4.8, 0, Math.PI * 2);
  ctx.arc(px + 12, py - 15, 4.8, 0, Math.PI * 2);
  ctx.fill();

  // 100% Furry Face Head (Standard real-opossum posture, Peach-Pink tone)
  ctx.fillStyle = "#FFD1DC";
  ctx.beginPath();
  ctx.ellipse(px, py - 12, pWidth * 0.45, 13, 0, 0, Math.PI * 2);
  ctx.fill();

  // Brown Eyes
  ctx.fillStyle = "#795548";
  ctx.beginPath();
  ctx.arc(px - 6.5, py - 14, 2.8, 0, Math.PI * 2);
  ctx.arc(px + 6.5, py - 14, 2.8, 0, Math.PI * 2);
  ctx.fill();

  // Red Nose
  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.arc(px, py - 17, 4.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Draws Ivan Opossum's vector polygon wireframe on Canvas
 */
export function drawIvanPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number = 28
) {
  ctx.save();
  ctx.strokeStyle = "#FFC0CB";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.68, 19, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(px, py - 12, pWidth * 0.45, 13, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#EF4444";
  ctx.beginPath();
  ctx.moveTo(px - 2, py - 15);
  ctx.lineTo(px, py - 18);
  ctx.lineTo(px + 2, py - 15);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
