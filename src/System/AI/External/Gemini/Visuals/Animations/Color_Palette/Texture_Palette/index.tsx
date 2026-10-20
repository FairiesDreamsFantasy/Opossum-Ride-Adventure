/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural texture patterns for high-fidelity game rendering.
 */
export const TexturePalette = {
  createWoodTexture: (ctx: CanvasRenderingContext2D) => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const tempCtx = canvas.getContext("2d");
    if (tempCtx) {
      tempCtx.fillStyle = "#8B4513";
      tempCtx.fillRect(0, 0, 64, 64);
      tempCtx.fillStyle = "#A0522D";
      for (let i = 0; i < 10; i++) {
        tempCtx.fillRect(0, Math.random() * 64, 64, 2 + Math.random() * 3);
      }
    }
    return ctx.createPattern(canvas, "repeat");
  },
  createNoiseTexture: (ctx: CanvasRenderingContext2D) => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const tempCtx = canvas.getContext("2d");
    if (tempCtx) {
      const imgData = tempCtx.createImageData(32, 32);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const val = Math.floor(Math.random() * 25) + 100;
        imgData.data[i] = val;
        imgData.data[i + 1] = val;
        imgData.data[i + 2] = val;
        imgData.data[i + 3] = 255;
      }
      tempCtx.putImageData(imgData, 0, 0);
    }
    return ctx.createPattern(canvas, "repeat");
  }
};

export default TexturePalette;
