/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ViewportTransformStabilizer — Finite-Safe Viewport Scaling & Stroke Alignment Kernel.
 */

export class ViewportTransformStabilizer {
  public static readonly MIN_DIMENSION = 1;
  public static readonly MAX_DIMENSION = 16384;

  /**
   * Ensures canvas coordinate inputs remain finite and bounded.
   */
  public static sanitizeCoordinate(value: number, fallback: number = 0): number {
    if (!Number.isFinite(value)) return Number.isFinite(fallback) ? fallback : 0;
    return Math.max(-65536, Math.min(65536, value));
  }

  /**
   * Aligns thin 1px orthogonal canvas strokes onto 0.5px pixel centers to avoid subpixel blur.
   */
  public static snapStrokeCoord(coord: number): number {
    const safe = this.sanitizeCoordinate(coord, 0);
    return Math.floor(safe) + 0.5;
  }

  /**
   * Computes uniform aspect-preserving scale factor for any source and destination viewport bounds.
   */
  public static computeViewportScale(
    srcWidth: number,
    srcHeight: number,
    dstWidth: number,
    dstHeight: number
  ): number {
    const sw = Math.max(this.MIN_DIMENSION, Math.min(this.MAX_DIMENSION, Number.isFinite(srcWidth) ? srcWidth : 840));
    const sh = Math.max(this.MIN_DIMENSION, Math.min(this.MAX_DIMENSION, Number.isFinite(srcHeight) ? srcHeight : 400));
    const dw = Math.max(this.MIN_DIMENSION, Math.min(this.MAX_DIMENSION, Number.isFinite(dstWidth) ? dstWidth : 840));
    const dh = Math.max(this.MIN_DIMENSION, Math.min(this.MAX_DIMENSION, Number.isFinite(dstHeight) ? dstHeight : 400));
    return Math.min(dw / sw, dh / sh);
  }
}
