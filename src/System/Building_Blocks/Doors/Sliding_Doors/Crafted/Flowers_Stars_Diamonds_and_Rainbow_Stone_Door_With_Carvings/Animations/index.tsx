/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Color Palette & Geometric Carving Helpers for Carved Stone Double Sliding Doors
 */

export const FLOWERS_STARS_DIAMONDS_RAINBOW_COLOR_PALETTE = {
  stoneBase: "#78716c",
  stoneHighlight: "#a8a29e",
  stoneShadow: "#44403c",
  carvingGroove: "#292524",
  rainbow: ["#ef4444", "#f97316", "#facc15", "#22c55e", "#38bdf8", "#a855f7"],
  flowerPetal: "#f472b6",
  flowerCenter: "#facc15",
  diamondGold: "#fbbf24",
  starGold: "#fde047"
};

/**
 * Draws a 5-point star carving centered at (cx, cy).
 */
export function drawFivePointStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  innerR: number
) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

/**
 * Draws a diamond carving centered at (cx, cy).
 */
export function drawCarvedDiamond(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  halfW: number,
  halfH: number
) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - halfH);
  ctx.lineTo(cx + halfW, cy);
  ctx.lineTo(cx, cy + halfH);
  ctx.lineTo(cx - halfW, cy);
  ctx.closePath();
}

/**
 * Renders one stone sliding door leaf with painted rainbow arc, carved flowers, diamonds, and 5-point stars.
 */
export function drawCarvedStoneDoorLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  wireframe: boolean
) {
  if (w <= 1 || h <= 1) return;
  const pal = FLOWERS_STARS_DIAMONDS_RAINBOW_COLOR_PALETTE;

  if (wireframe) {
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);
    drawFivePointStar(ctx, x + w * 0.5, y + h * 0.35, Math.min(w, h) * 0.16, Math.min(w, h) * 0.07);
    ctx.stroke();
    drawCarvedDiamond(ctx, x + w * 0.5, y + h * 0.7, w * 0.22, h * 0.12);
    ctx.stroke();
    return;
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  // Stone slab body & bevel border
  ctx.fillStyle = pal.stoneBase;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = pal.stoneShadow;
  ctx.lineWidth = Math.max(1.5, w * 0.04);
  ctx.strokeRect(x, y, w, h);

  // Inner carved relief inset
  const padX = w * 0.1;
  const padY = h * 0.08;
  ctx.strokeStyle = pal.carvingGroove;
  ctx.lineWidth = Math.max(1, w * 0.02);
  ctx.strokeRect(x + padX, y + padY, w - padX * 2, h - padY * 2);

  // Painted rainbow arch near upper half
  const archCx = x + w * 0.5;
  const archCy = y + h * 0.42;
  const maxR = Math.min(w * 0.36, h * 0.22);
  pal.rainbow.forEach((col, idx) => {
    const r = maxR * (1 - idx * 0.12);
    if (r > 1) {
      ctx.strokeStyle = col;
      ctx.lineWidth = Math.max(1, maxR * 0.11);
      ctx.beginPath();
      ctx.arc(archCx, archCy, r, Math.PI, 0);
      ctx.stroke();
    }
  });

  // 5-Point Star relief below rainbow
  const starR = Math.min(w, h) * 0.11;
  ctx.fillStyle = pal.starGold;
  ctx.strokeStyle = pal.carvingGroove;
  ctx.lineWidth = 1;
  drawFivePointStar(ctx, x + w * 0.5, y + h * 0.53, starR, starR * 0.45);
  ctx.fill();
  ctx.stroke();

  // Geometric Diamond carvings flanking center
  ctx.fillStyle = pal.diamondGold;
  const dW = w * 0.12;
  const dH = h * 0.07;
  drawCarvedDiamond(ctx, x + w * 0.26, y + h * 0.68, dW, dH);
  ctx.fill();
  ctx.stroke();
  drawCarvedDiamond(ctx, x + w * 0.74, y + h * 0.68, dW, dH);
  ctx.fill();
  ctx.stroke();

  // Carved flower motif at lower panel center
  const fCx = x + w * 0.5;
  const fCy = y + h * 0.8;
  const petalR = Math.max(1.5, Math.min(w, h) * 0.055);
  ctx.fillStyle = pal.flowerPetal;
  for (let p = 0; p < 5; p++) {
    const ang = (p * Math.PI * 2) / 5;
    ctx.beginPath();
    ctx.arc(fCx + Math.cos(ang) * petalR * 1.15, fCy + Math.sin(ang) * petalR * 1.15, petalR * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = pal.flowerCenter;
  ctx.beginPath();
  ctx.arc(fCx, fCy, petalR * 0.65, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default FLOWERS_STARS_DIAMONDS_RAINBOW_COLOR_PALETTE;
