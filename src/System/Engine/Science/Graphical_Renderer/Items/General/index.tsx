/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function drawGeneralItem(ctx: CanvasRenderingContext2D, x: number, y: number, type: string, size: number, wireframe: boolean): void {
  ctx.save();
  if (wireframe) {
    ctx.strokeStyle = type === "tick" ? "#fde047" : "#f43f5e";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    if (type === "apple") {
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "berry") {
      ctx.fillStyle = "#a855f7";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "tick") {
      ctx.fillStyle = "#eab308";
      ctx.beginPath();
      ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

export function getGeneralItemName(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
