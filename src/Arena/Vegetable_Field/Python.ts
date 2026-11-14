/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class VegetableFieldYieldModelPython {
  public static simulateYield(moisturePct: number, nitrogenPpm: number): number {
    const base = 120.0;
    const moistureFactor = 1.0 - Math.pow((moisturePct - 65.0) / 35.0, 2);
    const nitrogenFactor = Math.min(1.2, nitrogenPpm / 200.0);
    return Math.max(10.0, base * Math.max(0.1, moistureFactor) * nitrogenFactor);
  }
}
