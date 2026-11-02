/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const drawBalthazar2D = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.save();
  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(x, y, 35, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
