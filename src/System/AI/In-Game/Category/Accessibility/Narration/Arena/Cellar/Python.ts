/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CellarNarrationPython {
  public static calculateDampening(humidityPct: number): number {
    return Math.max(0.1, 1.0 - (humidityPct / 100.0) * 0.3);
  }
}
