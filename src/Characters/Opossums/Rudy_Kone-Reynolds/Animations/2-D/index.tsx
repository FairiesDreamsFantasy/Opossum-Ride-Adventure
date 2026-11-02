/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RUDY_COLOR_PALETTE } from "../Color_Palette";

export const renderRudy2D = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number = 1
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Compact Torso (Yellow Base)
  ctx.fillStyle = RUDY_COLOR_PALETTE.baseFur;
  ctx.beginPath();
  ctx.ellipse(0, 0, 38, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pattern: Brown circles with 1cm black border, spaced evenly
  const circlePositions = [
    { cx: -20, cy: -6, r: 5.5 },
    { cx: -8, cy: 3, r: 5.5 },
    { cx: 5, cy: -5, r: 5.5 },
    { cx: 16, cy: 4, r: 5.5 }
  ];

  circlePositions.forEach(c => {
    // 1cm thick Black border
    ctx.strokeStyle = RUDY_COLOR_PALETTE.circleBorder;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(c.cx, c.cy, c.r, 0, Math.PI * 2);
    ctx.stroke();

    // Brown circle fill
    ctx.fillStyle = RUDY_COLOR_PALETTE.circlePattern;
    ctx.beginPath();
    ctx.arc(c.cx, c.cy, c.r - 1, 0, Math.PI * 2);
    ctx.fill();
  });

  // Standard Head (Yellow)
  ctx.fillStyle = RUDY_COLOR_PALETTE.baseFur;
  ctx.beginPath();
  ctx.ellipse(32, -8, 19, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dark-Brown Skin / Snout Area
  ctx.fillStyle = RUDY_COLOR_PALETTE.skinTone;
  ctx.beginPath();
  ctx.ellipse(44, -5, 11, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // 30% Furry Face Coverage
  ctx.fillStyle = RUDY_COLOR_PALETTE.faceFur;
  ctx.beginPath();
  ctx.arc(38, -7, 6, 0, Math.PI * 2);
  ctx.fill();

  // Brownish-Red Nose
  ctx.fillStyle = RUDY_COLOR_PALETTE.nose;
  ctx.beginPath();
  ctx.arc(53, -4, 3, 0, Math.PI * 2);
  ctx.fill();

  // Blue Eye
  ctx.fillStyle = RUDY_COLOR_PALETTE.eyes;
  ctx.beginPath();
  ctx.arc(38, -12, 3, 0, Math.PI * 2);
  ctx.fill();

  // Downward Dog-like Ears oriented to sides (Orange outer, Brownish-Red inner)
  ctx.fillStyle = RUDY_COLOR_PALETTE.outerEar;
  ctx.beginPath();
  ctx.ellipse(24, -14, 7, 13, 0.75, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = RUDY_COLOR_PALETTE.innerEar;
  ctx.beginPath();
  ctx.ellipse(25, -13, 4, 9, 0.75, 0, Math.PI * 2);
  ctx.fill();

  // Short Dark-Brown Tail (7.128% furry)
  ctx.strokeStyle = RUDY_COLOR_PALETTE.tail;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-36, 2);
  ctx.quadraticCurveTo(-48, -4, -52, 4);
  ctx.stroke();

  // Brown Paws
  ctx.fillStyle = RUDY_COLOR_PALETTE.paws;
  ctx.beginPath();
  ctx.arc(18, 23, 5, 0, Math.PI * 2);
  ctx.arc(-18, 23, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

export default renderRudy2D;
