/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WildernessNarrationCPP {
  public static calculateAltitudeAcousticAttenuation(altitudeMeters: number): number {
    return Math.max(0.1, 1.0 - (altitudeMeters / 8000.0) * 0.5);
  }
}
