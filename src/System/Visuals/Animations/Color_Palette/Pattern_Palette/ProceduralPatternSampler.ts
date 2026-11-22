/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ProceduralPatternSampler — Analytic UV Sampling for Checkerboard, Stripe, & Grid Patterns.
 */

export class ProceduralPatternSampler {
  public static sampleCheckerboard(x: number, y: number, tileSize: number = 32): 0 | 1 {
    const safeSize = Math.max(1, Number.isFinite(tileSize) ? Math.abs(tileSize) : 32);
    const cx = Math.floor((Number.isFinite(x) ? x : 0) / safeSize);
    const cy = Math.floor((Number.isFinite(y) ? y : 0) / safeSize);
    return (((cx + cy) % 2) + 2) % 2 === 0 ? 0 : 1;
  }

  public static sampleRotatedStripes(x: number, y: number, angleDeg: number = 45, spacing: number = 16): number {
    const safeSpacing = Math.max(1, Number.isFinite(spacing) ? Math.abs(spacing) : 16);
    const rad = ((Number.isFinite(angleDeg) ? angleDeg : 45) * Math.PI) / 180;
    const proj = (Number.isFinite(x) ? x : 0) * Math.cos(rad) + (Number.isFinite(y) ? y : 0) * Math.sin(rad);
    const phase = ((proj % safeSpacing) + safeSpacing) % safeSpacing;
    return phase / safeSpacing;
  }

  public static sampleOrthogonalGrid(x: number, y: number, spacing: number = 24, lineThickness: number = 1.5): boolean {
    const safeSpacing = Math.max(2, Number.isFinite(spacing) ? Math.abs(spacing) : 24);
    const halfLine = Math.max(0.25, Number.isFinite(lineThickness) ? Math.abs(lineThickness) * 0.5 : 0.75);
    const modX = Math.abs((((Number.isFinite(x) ? x : 0) % safeSpacing) + safeSpacing) % safeSpacing);
    const modY = Math.abs((((Number.isFinite(y) ? y : 0) % safeSpacing) + safeSpacing) % safeSpacing);
    return modX <= halfLine || modY <= halfLine;
  }
}
