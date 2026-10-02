/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JOSEPH_COLOR_PALETTE } from "../Color_Palette/Pattern_Palette";

export function drawJoseph2D(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Scaled dimensions: 1.5% taller than base 7.0 ft moose
  const scaleH = h * 1.015;
  const scaleW = w * 1.01;

  // Thick Hooves (20% thicker)
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.hooves;
  const hoofW = scaleW * 0.144; // 20% thicker than baseline 0.12
  const hoofH = scaleH * 0.15;
  ctx.fillRect(-scaleW * 0.3 - hoofW * 0.1, -hoofH, hoofW, hoofH);
  ctx.fillRect(-scaleW * 0.1 - hoofW * 0.1, -hoofH, hoofW, hoofH);
  ctx.fillRect(scaleW * 0.1 - hoofW * 0.1, -hoofH, hoofW, hoofH);
  ctx.fillRect(scaleW * 0.25 - hoofW * 0.1, -hoofH, hoofW, hoofH);

  // Legs (White fur with peach skin tint)
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.fur;
  ctx.fillRect(-scaleW * 0.3, -scaleH * 0.3, scaleW * 0.12, scaleH * 0.2);
  ctx.fillRect(-scaleW * 0.1, -scaleH * 0.3, scaleW * 0.12, scaleH * 0.2);
  ctx.fillRect(scaleW * 0.1, -scaleH * 0.3, scaleW * 0.12, scaleH * 0.2);
  ctx.fillRect(scaleW * 0.25, -scaleH * 0.3, scaleW * 0.12, scaleH * 0.2);

  // Torso / Body (Pure White Fur)
  ctx.beginPath();
  ctx.ellipse(0, -scaleH * 0.5, scaleW * 0.46, scaleH * 0.36, 0, 0, Math.PI * 2);
  ctx.fill();

  // Thick Hackles along neck ridge
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.hackles;
  ctx.beginPath();
  ctx.moveTo(-scaleW * 0.05, -scaleH * 0.65);
  ctx.lineTo(-scaleW * 0.25, -scaleH * 0.88);
  ctx.lineTo(-scaleW * 0.12, -scaleH * 0.82);
  ctx.lineTo(scaleW * 0.05, -scaleH * 0.62);
  ctx.closePath();
  ctx.fill();

  // Neck & Head (White fur)
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.fur;
  ctx.beginPath();
  ctx.moveTo(-scaleW * 0.1, -scaleH * 0.6);
  ctx.lineTo(-scaleW * 0.35, -scaleH * 0.85);
  ctx.lineTo(-scaleW * 0.15, -scaleH * 0.9);
  ctx.lineTo(0, -scaleH * 0.65);
  ctx.closePath();
  ctx.fill();

  // Snout (Length matching Angelica) with Bright Peach skin hue
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.skin;
  ctx.beginPath();
  ctx.ellipse(-scaleW * 0.3, -scaleH * 0.82, scaleW * 0.15, scaleH * 0.1, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Pink Muzzle Tip (15% of snout length from muzzle tip)
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.muzzleTip;
  ctx.beginPath();
  ctx.ellipse(-scaleW * 0.37, -scaleH * 0.83, scaleW * 0.05, scaleH * 0.04, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // 1.5-inch diameter proportioned Nostrils
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.nostrils;
  ctx.beginPath();
  ctx.arc(-scaleW * 0.36, -scaleH * 0.82, Math.max(1.5, scaleW * 0.015), 0, Math.PI * 2);
  ctx.fill();

  // Ears (20% larger than baseline)
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.fur;
  ctx.beginPath();
  ctx.ellipse(-scaleW * 0.12, -scaleH * 0.92, scaleW * 0.096, scaleH * 0.048, -0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.skin;
  ctx.beginPath();
  ctx.ellipse(-scaleW * 0.12, -scaleH * 0.92, scaleW * 0.06, scaleH * 0.03, -0.5, 0, Math.PI * 2);
  ctx.fill();

  // Cream / White Antlers (Bull Moose Rack)
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.antlers;
  ctx.strokeStyle = JOSEPH_COLOR_PALETTE.antlerOutline;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(-scaleW * 0.15, -scaleH * 0.9);
  ctx.quadraticCurveTo(-scaleW * 0.48, -scaleH * 1.18, -scaleW * 0.36, -scaleH * 0.95);
  ctx.quadraticCurveTo(-scaleW * 0.25, -scaleH * 1.05, -scaleW * 0.15, -scaleH * 0.9);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-scaleW * 0.05, -scaleH * 0.9);
  ctx.quadraticCurveTo(scaleW * 0.28, -scaleH * 1.18, scaleW * 0.16, -scaleH * 0.95);
  ctx.quadraticCurveTo(scaleW * 0.05, -scaleH * 1.05, -scaleW * 0.05, -scaleH * 0.9);
  ctx.fill();
  ctx.stroke();

  // Vibrant Blue Eyes
  ctx.fillStyle = JOSEPH_COLOR_PALETTE.eyes;
  ctx.beginPath();
  ctx.arc(-scaleW * 0.22, -scaleH * 0.87, 3.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(-scaleW * 0.23, -scaleH * 0.88, 1.0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
