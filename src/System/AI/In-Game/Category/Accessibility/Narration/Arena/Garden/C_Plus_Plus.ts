/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GardenNarrationCPP {
  public static calculateResonance(leafDensity: number, windSpeedMs: number): number {
    return Math.max(0.2, leafDensity * windSpeedMs * 0.12);
  }
}
