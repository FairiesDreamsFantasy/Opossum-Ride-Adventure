/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GardenNarrationPython {
  public static rankBotanicalDescriptor(rarityFactor: number, length: number): number {
    return rarityFactor * Math.log(1 + length);
  }
}
