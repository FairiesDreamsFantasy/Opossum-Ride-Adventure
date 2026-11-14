/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class VegetableFieldNarrationRust {
  private cache: Map<string, string> = new Map();
  public get(k: string): string | undefined { return this.cache.get(k); }
  public set(k: string, v: string): void { if (this.cache.size < 64) this.cache.set(k, v); }
}
