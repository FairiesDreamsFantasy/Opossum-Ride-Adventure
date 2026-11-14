/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WildernessNarrationPython {
  public static calculateWildernessAtmosphereScore(windSpeed: number, wildlifeDensity: number): number {
    return Math.min(1.0, (windSpeed * 0.05) + (wildlifeDensity * 0.1));
  }
}
