/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class PorchNarrationRust {
  private pool: Float64Array[] = [];
  public acquire(): Float64Array {
    return this.pool.pop() || new Float64Array(512);
  }
  public release(b: Float64Array): void {
    if (this.pool.length < 32) this.pool.push(b);
  }
}
