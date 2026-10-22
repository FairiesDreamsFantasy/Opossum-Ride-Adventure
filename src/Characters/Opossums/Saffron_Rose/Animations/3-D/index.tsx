/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";
import { SAFFRON_COLORS } from "../Color_Palette";

import { drawEarPolkaDotPattern } from "../../../../../System/Utilities/Drawing_Utils";

/**
 * Renders Saffron Rose's 3-D Perspective Model on Canvas.
 * Mathematically precise and scientific implementation.
 */
export function drawSaffron3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  character: OpossumCharacter
) {
  const pWidth = 48; // Saffron Rose scaled body width
  
  ctx.save();

  // 1. Draw Gold Tail with Pink Wrap-around Spiral Pattern
  ctx.strokeStyle = SAFFRON_COLORS.tail;
  ctx.lineWidth = 5.5;
  ctx.lineCap = "round";
  
  const tailStartX = px;
  const tailStartY = py + 14;
  const cp1x = px - 24;
  const cp1y = py + 34;
  const cp2x = px - 40;
  const cp2y = py + 12;
  const endX = px - 52;
  const endY = py + 28;

  ctx.beginPath();
  ctx.moveTo(tailStartX, tailStartY);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
  ctx.stroke();

  ctx.strokeStyle = SAFFRON_COLORS.tailSpiral;
  ctx.lineWidth = 4.0;
  
  function getBezierPoint(t: number): { x: number; y: number } {
    const x = (1-t)*(1-t)*(1-t)*tailStartX + 3*(1-t)*(1-t)*t*cp1x + 3*(1-t)*t*t*cp2x + t*t*t*endX;
    const y = (1-t)*(1-t)*(1-t)*tailStartY + 3*(1-t)*(1-t)*t*cp1y + 3*(1-t)*t*t*cp2y + t*t*t*endY;
    return { x, y };
  }

  for (let t = 0.1; t < 0.95; t += 0.15) {
    const pt = getBezierPoint(t);
    const ptNext = getBezierPoint(t + 0.05);
    ctx.beginPath();
    ctx.moveTo(pt.x - 3, pt.y - 2);
    ctx.lineTo(ptNext.x + 3, ptNext.y + 2);
    ctx.stroke();
  }

  // 2. Body
  ctx.fillStyle = SAFFRON_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(px, py, pWidth * 0.65, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = SAFFRON_COLORS.secondary;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 3. Neck & Chest area
  ctx.fillStyle = SAFFRON_COLORS.primary;
  ctx.beginPath();
  ctx.ellipse(px, py - 12, 14, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = SAFFRON_COLORS.necklace;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(px, py - 11, 13, 0.15 * Math.PI, 0.85 * Math.PI, false);
  ctx.stroke();

  ctx.fillStyle = SAFFRON_COLORS.heart;
  const hx = px;
  const hy = py + 2;
  ctx.beginPath();
  ctx.moveTo(hx, hy);
  ctx.bezierCurveTo(hx - 5, hy - 4, hx - 8, hy + 2, hx, hy + 8);
  ctx.bezierCurveTo(hx + 8, hy + 2, hx + 5, hy - 4, hx, hy);
  ctx.fill();

  // 4. Hair
  ctx.fillStyle = SAFFRON_COLORS.head;
  ctx.beginPath();
  ctx.ellipse(px, py - 27, 24, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = SAFFRON_COLORS.hair;
  ctx.beginPath();
  ctx.moveTo(px - 18, py - 28);
  ctx.bezierCurveTo(px - 28, py - 12, px - 28, py + 8, px - 24, py + 15);
  ctx.bezierCurveTo(px - 18, py + 8, px - 20, py - 12, px - 18, py - 28);
  ctx.moveTo(px + 18, py - 28);
  ctx.bezierCurveTo(px + 28, py - 12, px + 28, py + 8, px + 24, py + 15);
  ctx.bezierCurveTo(px + 18, py + 8, px + 20, py - 12, px + 18, py - 28);
  ctx.fill();

  // 5. Tan Face
  ctx.fillStyle = SAFFRON_COLORS.face;
  ctx.beginPath();
  ctx.ellipse(px, py - 22, 20, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = SAFFRON_COLORS.face;
  ctx.beginPath();
  ctx.ellipse(px, py - 18, 11, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = SAFFRON_COLORS.head;
  ctx.beginPath();
  ctx.moveTo(px - 16, py - 30);
  ctx.quadraticCurveTo(px, py - 24, px + 16, py - 30);
  ctx.quadraticCurveTo(px, py - 33, px - 16, py - 30);
  ctx.fill();

  // 6. Ears
  ctx.fillStyle = SAFFRON_COLORS.earsOuter;
  ctx.beginPath();
  ctx.arc(px - 17, py - 31, 8, 0, Math.PI * 2);
  ctx.arc(px + 17, py - 31, 8, 0, Math.PI * 2);
  ctx.fill();

  // Apply neon saffron polka dots to outer ears
  drawEarPolkaDotPattern(ctx, px - 17, py - 31, 8);
  drawEarPolkaDotPattern(ctx, px + 17, py - 31, 8);

  ctx.fillStyle = SAFFRON_COLORS.earsInner;
  ctx.beginPath();
  ctx.arc(px - 17, py - 31, 5, 0, Math.PI * 2);
  ctx.arc(px + 17, py - 31, 5, 0, Math.PI * 2);
  ctx.fill();

  // 7. Green Eyes
  ctx.fillStyle = SAFFRON_COLORS.eyes;
  ctx.beginPath();
  ctx.arc(px - 8, py - 23, 4, 0, Math.PI * 2);
  ctx.arc(px + 8, py - 23, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(px - 9.5, py - 24.5, 1.2, 0, Math.PI * 2);
  ctx.arc(px + 6.5, py - 24.5, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // 8. Nose
  ctx.fillStyle = SAFFRON_COLORS.nose;
  ctx.beginPath();
  ctx.arc(px, py - 15, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
