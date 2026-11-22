/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * OrderedHalftoneSolver — 4x4 Threshold Binary & Dual-Tone Monochrome Quantization.
 */

const HALFTONE_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5
];

export class OrderedHalftoneSolver {
  public static thresholdBinary(gray0To255: number, threshold: number = 128): string {
    const g = Number.isFinite(gray0To255) ? gray0To255 : 0;
    const t = Number.isFinite(threshold) ? threshold : 128;
    return g >= t ? "#ffffff" : "#000000";
  }

  public static evaluateOrderedDot(gray0To255: number, x: number, y: number): 0 | 1 {
    const normalized = Math.max(0, Math.min(1, (Number.isFinite(gray0To255) ? gray0To255 : 0) / 255));
    const ix = ((Math.floor(Number.isFinite(x) ? x : 0) % 4) + 4) % 4;
    const iy = ((Math.floor(Number.isFinite(y) ? y : 0) % 4) + 4) % 4;
    const cutoff = (HALFTONE_4X4[iy * 4 + ix] + 0.5) / 16.0;
    return normalized >= cutoff ? 1 : 0;
  }
}
