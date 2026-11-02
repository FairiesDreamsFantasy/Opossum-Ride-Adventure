/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const drawBalthazarPixelations = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillStyle = "#FFD700"; // Gold
  ctx.fillRect(x, y, 40, 70);
  ctx.fillStyle = "#FFFFFF"; // White 20% muzzle
  ctx.fillRect(x + 30, y + 10, 10, 8);
};
