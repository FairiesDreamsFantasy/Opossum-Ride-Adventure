/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ItemColorContrastSolver } from "./ItemColorContrastSolver";

export * from "./ItemColorContrastSolver";

export function drawGeneralItem(ctx: CanvasRenderingContext2D, x: number, y: number, type: string, size: number, wireframe: boolean): void {
  ctx.save();
  const pal = ItemColorContrastSolver.resolveItemPalette(type, wireframe);
  if (wireframe) {
    ctx.strokeStyle = pal.strokeHex;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    ctx.fillStyle = pal.fillHex;
    ctx.beginPath();
    ctx.arc(x, y, type === "tick" ? size * 0.8 : size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function getGeneralItemName(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
