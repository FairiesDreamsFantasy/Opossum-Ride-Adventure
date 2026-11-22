/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * BayerDitherMatrix — Ordered 4x4 Threshold Matrix & Luminance Quantization Kernel.
 */

const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5
];

export class BayerDitherMatrix {
  public static getThreshold4x4(x: number, y: number): number {
    const ix = ((Math.floor(Number.isFinite(x) ? x : 0) % 4) + 4) % 4;
    const iy = ((Math.floor(Number.isFinite(y) ? y : 0) % 4) + 4) % 4;
    return (BAYER_4X4[iy * 4 + ix] + 0.5) / 16.0;
  }

  public static quantizeChannelOrdered(channel0To255: number, x: number, y: number, levels: number = 6): number {
    const clean = Math.max(0, Math.min(255, Number.isFinite(channel0To255) ? channel0To255 : 0));
    const safeLevels = Math.max(2, Math.min(64, Math.floor(levels)));
    const threshold = this.getThreshold4x4(x, y) - 0.5;
    const step = 255 / (safeLevels - 1);
    const adjusted = Math.max(0, Math.min(255, clean + threshold * step));
    return Math.round(adjusted / step) * step;
  }
}
