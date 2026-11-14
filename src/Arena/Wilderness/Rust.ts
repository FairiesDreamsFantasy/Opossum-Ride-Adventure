/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WildernessBufferPoolRust {
  private cache: Float64Array[] = [];
  public getBuffer(): Float64Array {
    return this.cache.pop() || new Float64Array(2048);
  }
  public returnBuffer(buf: Float64Array): void {
    if (this.cache.length < 32) this.cache.push(buf);
  }
}
