/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class PorchNarrationCSharp {
  private viewMode: string = "PANORAMIC";
  public setView(mode: string): string {
    this.viewMode = mode.toUpperCase();
    return this.viewMode;
  }
}
