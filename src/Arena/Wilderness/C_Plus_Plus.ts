/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WildernessAcousticsCPP {
  public static calculateReverbDecay(altitudeMeters: number, roughness: number): number {
    return Math.max(0.2, 3.5 * (1.0 - altitudeMeters / 5000.0) * (1.0 + roughness * 0.5));
  }
}
