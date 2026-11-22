/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TilingFrequencyStabilizer — Nyquist-Safe UV Tiling & Anti-Aliased Screen-Space Attenuation.
 */

export class TilingFrequencyStabilizer {
  public static computeNyquistPatternFade(pixelSpacing: number): number {
    const s = Number.isFinite(pixelSpacing) ? Math.abs(pixelSpacing) : 16;
    if (s <= 1.0) return 0;
    if (s >= 4.0) return 1.0;
    return Math.max(0, Math.min(1, (s - 1.0) / 3.0));
  }

  public static wrapUV(u: number): number {
    const safe = Number.isFinite(u) ? u : 0;
    return safe - Math.floor(safe);
  }
}
