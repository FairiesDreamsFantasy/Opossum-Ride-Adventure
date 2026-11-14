/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class VegetableFieldNarrationCSharp {
  private irrigationState: string = "ACTIVE";
  public setIrrigation(active: boolean): string {
    this.irrigationState = active ? "ACTIVE" : "STANDBY";
    return this.irrigationState;
  }
}
