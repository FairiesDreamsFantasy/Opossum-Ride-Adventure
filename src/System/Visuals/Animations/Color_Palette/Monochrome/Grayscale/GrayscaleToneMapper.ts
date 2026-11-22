/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GrayscaleToneMapper — Reinhard Highlights Compression & Gamma S-Curve Mapping.
 */

export class GrayscaleToneMapper {
  public static applyGamma(luminance0To255: number, gamma: number = 2.2): number {
    const clean = Math.max(0, Math.min(255, Number.isFinite(luminance0To255) ? luminance0To255 : 0));
    const safeGamma = Math.max(0.1, Math.min(8.0, Number.isFinite(gamma) ? gamma : 2.2));
    return Math.round(255 * Math.pow(clean / 255, 1 / safeGamma));
  }

  public static applyReinhardToneMap(hdrLuminance: number, whitePoint: number = 1.0): number {
    const l = Math.max(0, Number.isFinite(hdrLuminance) ? hdrLuminance : 0);
    const w = Math.max(0.05, Number.isFinite(whitePoint) ? whitePoint : 1.0);
    const mapped = (l * (1 + l / (w * w))) / (1 + l);
    return Math.max(0, Math.min(255, mapped * 255));
  }
}
