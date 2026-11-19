/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../types";

export const IsaacOpossumAnimations = {
  gallopRate: 1.22,
  earTwitchIntervalMs: 3200,
  tailSwayAngleDeg: 11
};

/**
 * Renders Isaac Opossum's 2-D Blueprint model on Canvas (Light-Gray coat with 8 dark-brown stripes)
 */
export function drawIsaac2D(
  ctx: CanvasRenderingContext2D,
  plX: number,
  plY: number,
  _character?: OpossumCharacter
) {
  ctx.save();
  // Light-Gray base body scaled for compact Jack (27.5 in width)
  ctx.fillStyle = "#D1D5DB";
  ctx.beginPath();
  ctx.ellipse(plX, plY, 12.5, 20.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // 8 evenly spaced dark-brown stripes of even thickness
  ctx.strokeStyle = "#3E2723";
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 8; i++) {
    const sx = plX - 9 + i * (18 / 7);
    ctx.beginPath();
    ctx.moveTo(sx, plY - 13);
    ctx.lineTo(sx, plY + 13);
    ctx.stroke();
  }

  // Pinkish-red nose tip
  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.arc(plX, plY - 20.5, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Renders Isaac Opossum's 3-D Perspective Model on Canvas
 */
export function drawIsaac3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  _width: number,
  _height: number,
  _character?: OpossumCharacter
) {
  ctx.save();
  const pWidth = 27.5; // Isaac body width: 27.5 inches

  // Natural Pink Tail
  ctx.strokeStyle = "#FFC0CB";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(px, py + 11);
  ctx.bezierCurveTo(px - 17, py + 25, px - 29, py + 8, px - 36, py + 19);
  ctx.stroke();

  // Natural Paws
  ctx.fillStyle = "#C4A482";
  ctx.beginPath();
  ctx.arc(px - 11.5, py + 17.5, 4.5, 0, Math.PI * 2);
  ctx.arc(px + 11.5, py + 17.5, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Torso (Light-Gray base coat)
  ctx.fillStyle = "#D1D5DB";
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.68, 18.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // 8 Evenly Spaced Dark-Brown Stripes of Even Thickness clipped to torso
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.68, 18.5, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = "#3E2723";
  ctx.lineWidth = 2.0;
  const rx = pWidth * 0.68;
  for (let i = 0; i < 8; i++) {
    const sx = px - rx * 0.85 + i * ((rx * 1.7) / 7);
    ctx.beginPath();
    ctx.moveTo(sx, py - 19);
    ctx.lineTo(sx, py + 19);
    ctx.stroke();
  }
  ctx.restore();

  // Ears: Natural real opossum dark outer with natural pink inner
  ctx.fillStyle = "#1A1A1A";
  ctx.beginPath();
  ctx.arc(px - 11.5, py - 14.5, 7.2, 0, Math.PI * 2);
  ctx.arc(px + 11.5, py - 14.5, 7.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#FFB6C1";
  ctx.beginPath();
  ctx.arc(px - 11.5, py - 14.5, 4.6, 0, Math.PI * 2);
  ctx.arc(px + 11.5, py - 14.5, 4.6, 0, Math.PI * 2);
  ctx.fill();

  // 100% Furry Face Head (Standard real-opossum posture)
  ctx.fillStyle = "#E5E7EB";
  ctx.beginPath();
  ctx.ellipse(px, py - 11.5, pWidth * 0.45, 12.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dark-brown Eyes
  ctx.fillStyle = "#4A3728";
  ctx.beginPath();
  ctx.arc(px - 6.2, py - 13.5, 2.8, 0, Math.PI * 2);
  ctx.arc(px + 6.2, py - 13.5, 2.8, 0, Math.PI * 2);
  ctx.fill();

  // Pinkish-red Nose
  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.arc(px, py - 16.5, 4.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Draws Isaac Opossum's vector polygon wireframe on Canvas
 */
export function drawIsaacPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number = 27.5
) {
  ctx.save();
  ctx.strokeStyle = "#D1D5DB";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.68, 18.5, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(px, py - 11.5, pWidth * 0.45, 12.5, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#EF4444";
  ctx.beginPath();
  ctx.moveTo(px - 2, py - 14.5);
  ctx.lineTo(px, py - 17.5);
  ctx.lineTo(px + 2, py - 14.5);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
