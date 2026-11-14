/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CellarNarrationCPP {
  public static calculateEchoDelay(stonePorosity: number, volumeM3: number): number {
    return Math.max(0.05, stonePorosity * (volumeM3 / 1000.0) * 0.4);
  }
}
