/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CropFieldNarrationCPP {
  public static calculateStalkResonance(densityPerSqM: number, heightM: number): number {
    return Math.max(0.1, densityPerSqM * heightM * 0.05);
  }
}
