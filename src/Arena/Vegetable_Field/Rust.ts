/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class VegetableFieldBufferPoolRust {
  private pool: Float64Array[] = [];
  public acquire(): Float64Array {
    return this.pool.pop() || new Float64Array(1024);
  }
  public release(buf: Float64Array): void {
    if (this.pool.length < 64) this.pool.push(buf);
  }
}
