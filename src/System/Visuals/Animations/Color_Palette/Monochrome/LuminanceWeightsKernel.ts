/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LuminanceWeightsKernel — ITU-R BT.601 / BT.709 / CRT Phosphor Transformations.
 */

export class LuminanceWeightsKernel {
  public static readonly BT601 = { R: 0.299, G: 0.587, B: 0.114 } as const;
  public static readonly BT709 = { R: 0.2126, G: 0.7152, B: 0.0722 } as const;

  public static computeRec601Luminance(r: number, g: number, b: number): number {
    const sr = Math.max(0, Math.min(255, Number.isFinite(r) ? r : 0));
    const sg = Math.max(0, Math.min(255, Number.isFinite(g) ? g : 0));
    const sb = Math.max(0, Math.min(255, Number.isFinite(b) ? b : 0));
    return this.BT601.R * sr + this.BT601.G * sg + this.BT601.B * sb;
  }

  public static computeRec709Luminance(r: number, g: number, b: number): number {
    const sr = Math.max(0, Math.min(255, Number.isFinite(r) ? r : 0));
    const sg = Math.max(0, Math.min(255, Number.isFinite(g) ? g : 0));
    const sb = Math.max(0, Math.min(255, Number.isFinite(b) ? b : 0));
    return this.BT709.R * sr + this.BT709.G * sg + this.BT709.B * sb;
  }
}
