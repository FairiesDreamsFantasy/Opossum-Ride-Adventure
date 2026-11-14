/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GardenNarrationCSharp {
  private subState: string = "DEFAULT";
  public setSubArea(areaName: string): string {
    this.subState = areaName.toUpperCase();
    return this.subState;
  }
}
