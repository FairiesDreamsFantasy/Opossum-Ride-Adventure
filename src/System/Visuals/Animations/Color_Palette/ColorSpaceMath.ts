/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ColorSpaceMath — sRGB Linearization, CIE Relative Luminance, WCAG Contrast & Safe Channel Arithmetic.
 */

export interface ColorRGBTuple {
  r: number;
  g: number;
  b: number;
}

export class ColorSpaceMath {
  public static clampChannel(val: number): number {
    const clean = Number.isFinite(val) ? val : 0;
    return Math.max(0, Math.min(255, Math.round(clean)));
  }

  public static parseHexSafe(hex: string, fallback: ColorRGBTuple = { r: 0, g: 0, b: 0 }): ColorRGBTuple {
    if (typeof hex !== "string") return { ...fallback };
    const clean = hex.trim();
    const fullMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(clean);
    if (fullMatch) {
      return {
        r: parseInt(fullMatch[1], 16),
        g: parseInt(fullMatch[2], 16),
        b: parseInt(fullMatch[3], 16)
      };
    }
    const shortMatch = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(clean);
    if (shortMatch) {
      return {
        r: parseInt(shortMatch[1] + shortMatch[1], 16),
        g: parseInt(shortMatch[2] + shortMatch[2], 16),
        b: parseInt(shortMatch[3] + shortMatch[3], 16)
      };
    }
    return { ...fallback };
  }

  public static toHex(rgb: ColorRGBTuple): string {
    const r = this.clampChannel(rgb?.r ?? 0).toString(16).padStart(2, "0");
    const g = this.clampChannel(rgb?.g ?? 0).toString(16).padStart(2, "0");
    const b = this.clampChannel(rgb?.b ?? 0).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }

  public static srgbToLinear(channel0To255: number): number {
    const c = Math.max(0, Math.min(1, (Number.isFinite(channel0To255) ? channel0To255 : 0) / 255));
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  public static linearToSrgb(linear0To1: number): number {
    const c = Math.max(0, Math.min(1, Number.isFinite(linear0To1) ? linear0To1 : 0));
    const srgb = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    return this.clampChannel(srgb * 255);
  }

  public static computeRelativeLuminance(rgb: ColorRGBTuple): number {
    const rLin = this.srgbToLinear(rgb?.r ?? 0);
    const gLin = this.srgbToLinear(rgb?.g ?? 0);
    const bLin = this.srgbToLinear(rgb?.b ?? 0);
    return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
  }

  public static computeWcagContrastRatio(a: ColorRGBTuple, b: ColorRGBTuple): number {
    const lumA = this.computeRelativeLuminance(a);
    const lumB = this.computeRelativeLuminance(b);
    const lighter = Math.max(lumA, lumB);
    const darker = Math.min(lumA, lumB);
    return (lighter + 0.05) / (darker + 0.05);
  }

  public static lerpLinearRgb(a: ColorRGBTuple, b: ColorRGBTuple, t: number): ColorRGBTuple {
    const u = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
    const rLin = this.srgbToLinear(a?.r ?? 0) * (1 - u) + this.srgbToLinear(b?.r ?? 0) * u;
    const gLin = this.srgbToLinear(a?.g ?? 0) * (1 - u) + this.srgbToLinear(b?.g ?? 0) * u;
    const bLin = this.srgbToLinear(a?.b ?? 0) * (1 - u) + this.srgbToLinear(b?.b ?? 0) * u;
    return {
      r: this.linearToSrgb(rLin),
      g: this.linearToSrgb(gLin),
      b: this.linearToSrgb(bLin)
    };
  }
}
