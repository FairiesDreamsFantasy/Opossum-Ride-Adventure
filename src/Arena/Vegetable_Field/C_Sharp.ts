/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class VegetableFieldStateMachineCSharp {
  private state: string = "OPTIMIZED_IRRIGATION";
  public transition(soilStatus: string): string {
    if (soilStatus === "dry") this.state = "ACTIVATING_DRIP_BOOM";
    else if (soilStatus === "optimal") this.state = "SOLAR_MONITORING";
    return this.state;
  }
}
