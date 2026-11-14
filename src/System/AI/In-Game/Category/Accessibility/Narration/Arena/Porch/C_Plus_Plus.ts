/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class PorchNarrationCPP {
  public static calculateBreezeModulation(altitudeFt: number, windKts: number): number {
    return Math.max(0.1, (altitudeFt / 4000.0) * (windKts / 20.0));
  }
}
