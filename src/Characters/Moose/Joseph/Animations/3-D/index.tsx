/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { drawJoseph2D } from "../2-D";

export function drawJoseph3D(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  isBreathingFire: boolean = false,
  isMonkeyMounted: boolean = false
) {
  drawJoseph2D(ctx, x, y, w, h);

  // Fire breath effect when activated
  if (isBreathingFire) {
    ctx.save();
    ctx.translate(x, y);
    const fireGrad = ctx.createRadialGradient(-w * 0.45, -h * 0.85, 2, -w * 0.7, -h * 0.85, w * 0.35);
    fireGrad.addColorStop(0, "rgba(255, 255, 200, 0.9)");
    fireGrad.addColorStop(0.3, "rgba(255, 140, 0, 0.8)");
    fireGrad.addColorStop(0.7, "rgba(220, 38, 38, 0.6)");
    fireGrad.addColorStop(1, "rgba(180, 0, 0, 0)");

    ctx.fillStyle = fireGrad;
    ctx.beginPath();
    ctx.moveTo(-w * 0.38, -h * 0.83);
    ctx.lineTo(-w * 0.75, -h * 0.98);
    ctx.lineTo(-w * 0.85, -h * 0.85);
    ctx.lineTo(-w * 0.75, -h * 0.72);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Visual saddle / harness zone for monkey riders
  if (isMonkeyMounted) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#854d0e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.52, w * 0.22, h * 0.12, 0, 0, Math.PI);
    ctx.stroke();
    ctx.restore();
  }
}
