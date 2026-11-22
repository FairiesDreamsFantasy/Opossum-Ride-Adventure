/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * DownsampleBlockSolver — RGBA Buffer Block Downsampling with Safe Bounds Guard.
 */

export class DownsampleBlockSolver {
  public static applyBlockMosaicRGBA(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    blockSize: number
  ): void {
    const safeBlock = Math.max(1, Math.min(64, Math.floor(Number.isFinite(blockSize) ? blockSize : 1)));
    if (safeBlock <= 1 || width <= 0 || height <= 0 || data.length < width * height * 4) return;

    for (let y = 0; y < height; y += safeBlock) {
      for (let x = 0; x < width; x += safeBlock) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        for (let by = 0; by < safeBlock && y + by < height; by++) {
          for (let bx = 0; bx < safeBlock && x + bx < width; bx++) {
            const bIdx = ((y + by) * width + (x + bx)) * 4;
            data[bIdx] = r;
            data[bIdx + 1] = g;
            data[bIdx + 2] = b;
            data[bIdx + 3] = a;
          }
        }
      }
    }
  }
}
