/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WorldProgressionFSM_CSharp {
  private currentStage: number = 1;
  public advance(): number {
    this.currentStage = Math.min(40, this.currentStage + 1);
    return this.currentStage;
  }
}
