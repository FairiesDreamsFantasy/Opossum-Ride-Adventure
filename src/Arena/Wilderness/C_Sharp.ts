/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WildernessStateMachineCSharp {
  private biomeState: string = "EXPLORING_WILDERNESS";
  public updateBiome(altitude: number): string {
    if (altitude > 3000) this.biomeState = "ALPINE_PEAK";
    else if (altitude < 200) this.biomeState = "DESERT_OR_BASIN";
    else this.biomeState = "FOREST_OR_PLAIN";
    return this.biomeState;
  }
}
