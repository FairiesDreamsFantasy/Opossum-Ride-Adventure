/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function drawObjectGeneral(ctx: CanvasRenderingContext2D, x: number, y: number, type: string, size: number, wireframe: boolean): void {
  ctx.save();
  ctx.fillStyle = "gold";
  ctx.fillRect(x - size, y - size, size * 2, size * 2);
  ctx.restore();
}

export function getObjectGeneralName(type: string): string {
  return "Scientific Object: " + type;
}
