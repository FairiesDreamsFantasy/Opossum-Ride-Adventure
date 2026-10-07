/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class Pig2DRenderer {
  public static drawPig2D(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number = 1.0,
    baseColor: string = "#5C3A21",
    snoutColor: string = "#E09B9B"
  ) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Body oval
    ctx.fillStyle = baseColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Snout
    ctx.fillStyle = snoutColor;
    ctx.beginPath();
    ctx.ellipse(22, 2, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nostrils
    ctx.fillStyle = "#221111";
    ctx.beginPath();
    ctx.arc(23, 1, 1.5, 0, Math.PI * 2);
    ctx.arc(23, 4, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
