/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CropFieldNarrationCSharp {
  private harvestState: string = "GROWING";
  public updateHarvest(progress: number): string {
    if (progress >= 1.0) this.harvestState = "READY_FOR_HARVEST";
    else this.harvestState = "CULTIVATING";
    return this.harvestState;
  }
}
