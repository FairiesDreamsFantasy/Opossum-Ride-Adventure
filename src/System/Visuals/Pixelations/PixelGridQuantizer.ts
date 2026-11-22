/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PixelGridQuantizer — Singularity-Safe Grid Snapping & Virtual Resolution Scaling.
 */

export class PixelGridQuantizer {
  public static snapToGrid(value: number, gridSize: number): number {
    const safeVal = Number.isFinite(value) ? value : 0;
    const safeGrid = Math.max(1, Number.isFinite(gridSize) ? Math.abs(gridSize) : 1);
    return Math.floor(safeVal / safeGrid) * safeGrid;
  }

  public static computeScaledDimensions(
    width: number,
    height: number,
    pixelSize: number
  ): { cols: number; rows: number; blockSize: number } {
    const blockSize = Math.max(1, Math.min(64, Math.floor(Number.isFinite(pixelSize) ? pixelSize : 1)));
    const safeW = Math.max(1, Math.floor(Number.isFinite(width) ? width : 320));
    const safeH = Math.max(1, Math.floor(Number.isFinite(height) ? height : 240));
    return {
      cols: Math.max(1, Math.ceil(safeW / blockSize)),
      rows: Math.max(1, Math.ceil(safeH / blockSize)),
      blockSize
    };
  }
}
