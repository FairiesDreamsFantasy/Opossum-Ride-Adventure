/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CropFieldNarrationPython {
  public static calculateYieldFactor(sunlightHours: number): number {
    return Math.min(1.5, sunlightHours / 12.0);
  }
}
