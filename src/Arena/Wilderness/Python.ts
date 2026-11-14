/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WildernessTerrainModelPython {
  public static calculateErosion(slopeRad: number, rainfallMm: number): number {
    return Math.max(0.01, Math.sin(slopeRad) * rainfallMm * 0.045);
  }
}
