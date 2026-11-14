/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CellarNarrationCSharp {
  private depthLevel: number = 1;
  public setDepth(level: number): number {
    this.depthLevel = Math.max(1, level);
    return this.depthLevel;
  }
}
