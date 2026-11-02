/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DRAKE_COLOR_PALETTE } from "../Color_Palette";
import { DRAKE_GEOMETRY } from "../Geometry";

export const renderDrake2D = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number = 1
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Stocky Torso (Red)
  ctx.fillStyle = DRAKE_COLOR_PALETTE.baseFur;
  ctx.beginPath();
  ctx.ellipse(0, 0, 42, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  // 7 Vertical Silver Stripes with 1cm black border and rounded ends
  for (let i = 0; i < 7; i++) {
    const stripeX = -27 + i * 9;
    const stripeHeight = 36 - Math.abs(i - 3) * 3;
    
    // Black border
    ctx.strokeStyle = DRAKE_COLOR_PALETTE.stripeBorder;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(stripeX, -stripeHeight / 2);
    ctx.lineTo(stripeX, stripeHeight / 2);
    ctx.stroke();

    // Silver stripe fill
    ctx.strokeStyle = DRAKE_COLOR_PALETTE.stripes;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(stripeX, -stripeHeight / 2);
    ctx.lineTo(stripeX, stripeHeight / 2);
    ctx.stroke();
  }

  // Perched Forward Head
  ctx.fillStyle = DRAKE_COLOR_PALETTE.baseFur;
  ctx.beginPath();
  ctx.ellipse(35, -10, 22, 18, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // 30% Furry Face Skin / Snout (10% shorter than Dagmar)
  ctx.fillStyle = DRAKE_COLOR_PALETTE.skinTone;
  ctx.beginPath();
  ctx.ellipse(48, -7, 12, 9, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Face Fur Overlay (30% coverage)
  ctx.fillStyle = DRAKE_COLOR_PALETTE.faceFur;
  ctx.beginPath();
  ctx.arc(42, -9, 7, 0, Math.PI * 2);
  ctx.fill();

  // Bright Red Nose
  ctx.fillStyle = DRAKE_COLOR_PALETTE.nose;
  ctx.beginPath();
  ctx.arc(58, -6, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Green Eye
  ctx.fillStyle = DRAKE_COLOR_PALETTE.eyes;
  ctx.beginPath();
  ctx.arc(42, -14, 3, 0, Math.PI * 2);
  ctx.fill();

  // Dark-Brown Outer Ears with Reddish-Brown Inner Ears
  ctx.fillStyle = DRAKE_COLOR_PALETTE.outerEar;
  ctx.beginPath();
  ctx.ellipse(26, -26, 8, 12, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = DRAKE_COLOR_PALETTE.innerEar;
  ctx.beginPath();
  ctx.ellipse(26, -26, 5, 8, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Short-Tailed Red Tail (30% shortened scale, 5% fur)
  ctx.strokeStyle = DRAKE_COLOR_PALETTE.tail;
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-40, 0);
  ctx.quadraticCurveTo(-55, -10, -60, -2);
  ctx.stroke();

  // Gold Paws with Brown Pads
  ctx.fillStyle = DRAKE_COLOR_PALETTE.paws;
  ctx.beginPath();
  ctx.arc(22, 26, 5.5, 0, Math.PI * 2);
  ctx.arc(-22, 26, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = DRAKE_COLOR_PALETTE.pawPads;
  ctx.beginPath();
  ctx.arc(22, 27, 2.5, 0, Math.PI * 2);
  ctx.arc(-22, 27, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

export default renderDrake2D;
