/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class VegetableFieldNarrationCPP {
  public static calculateLeafMoistureReverb(humidity: number): number {
    return Math.max(0.2, humidity * 0.01 * 0.8);
  }
}
