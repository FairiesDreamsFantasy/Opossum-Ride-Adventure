/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WildernessNarrationCSharp {
  private biomeZone: string = "ALPINE";
  public setZone(zone: string): string {
    this.biomeZone = zone.toUpperCase();
    return this.biomeZone;
  }
}
