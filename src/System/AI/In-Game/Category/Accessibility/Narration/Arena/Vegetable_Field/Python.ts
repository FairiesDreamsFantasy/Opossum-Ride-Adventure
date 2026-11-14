/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class VegetableFieldNarrationPython {
  public static scoreNutrientIndex(npkRatio: number): number {
    return Math.min(1.0, npkRatio / 10.0);
  }
}
