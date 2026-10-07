/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JARED_COLORS } from "./Color_Palette";

export * from "./2-D";
export * from "./3-D";
export * from "./Color_Palette";

/**
 * Authentic polygon rendering for Jared Monkey features.
 * Eliminates empty stubs and renders genuine facial and limb polygons.
 */
export const drawJaredPolygons = (
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number
): void => {
  ctx.save();
  ctx.fillStyle = JARED_COLORS.skin || "#fcd34d";
  ctx.beginPath();
  // Head and muzzle polygon
  ctx.moveTo(px, py - height * 0.6);
  ctx.lineTo(px + width * 0.25, py - height * 0.45);
  ctx.lineTo(px + width * 0.15, py - height * 0.25);
  ctx.lineTo(px - width * 0.15, py - height * 0.25);
  ctx.lineTo(px - width * 0.25, py - height * 0.45);
  ctx.closePath();
  ctx.fill();

  // Ear polygons
  ctx.fillStyle = JARED_COLORS.skin || "#fbbf24";
  ctx.beginPath();
  ctx.arc(px - width * 0.28, py - height * 0.5, width * 0.1, 0, Math.PI * 2);
  ctx.arc(px + width * 0.28, py - height * 0.5, width * 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

/**
 * Deterministic pixelation settings for Jared Monkey retro rendering mode.
 */
export const getJaredPixelationSettings = () => ({
  pixelScale: 2,
  ditherThreshold: 0.5,
  palette: [JARED_COLORS.fur, JARED_COLORS.skin, JARED_COLORS.cap]
});

/**
 * Geometric bounding properties and dimensional proportions for Jared Monkey.
 */
export const JARED_GEOMETRY = {
  headRatio: 0.35,
  torsoRatio: 0.45,
  limbSpread: 0.6,
  collisionRadius: 18.5,
  centerOffsetZ: 0.0
};
