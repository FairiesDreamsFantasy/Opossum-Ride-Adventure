/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GardenNarrationRust {
  private cache: Map<string, string> = new Map();
  public get(key: string): string | undefined {
    return this.cache.get(key);
  }
  public set(key: string, val: string): void {
    if (this.cache.size < 64) this.cache.set(key, val);
  }
}
