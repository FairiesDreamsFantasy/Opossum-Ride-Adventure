/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural geometric patterns for wireframe overlay and map blueprints.
 */
export const PatternPalette = {
  createGridPattern: (ctx: CanvasRenderingContext2D, size: number = 10, color: string = "#555") => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const tempCtx = canvas.getContext("2d");
    if (tempCtx) {
      tempCtx.strokeStyle = color;
      tempCtx.lineWidth = 1;
      tempCtx.strokeRect(0, 0, size, size);
    }
    return ctx.createPattern(canvas, "repeat");
  },
  createDotPattern: (ctx: CanvasRenderingContext2D, size: number = 10, color: string = "#fff") => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const tempCtx = canvas.getContext("2d");
    if (tempCtx) {
      tempCtx.fillStyle = color;
      tempCtx.beginPath();
      tempCtx.arc(size / 2, size / 2, 1.5, 0, Math.PI * 2);
      tempCtx.fill();
    }
    return ctx.createPattern(canvas, "repeat");
  }
};

export default PatternPalette;
