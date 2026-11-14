/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class PorchNarrationPython {
  public static scoreAcousticHorizon(distanceKm: number): number {
    return Math.max(0.0, 1.0 - distanceKm / 50.0);
  }
}
