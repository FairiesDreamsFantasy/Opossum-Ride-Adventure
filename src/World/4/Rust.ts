/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WorldParticleBufferPoolRust {
  private buffers: Float64Array[] = [];
  public acquire(): Float64Array {
    return this.buffers.pop() || new Float64Array(4096);
  }
  public release(buf: Float64Array): void {
    if (this.buffers.length < 64) this.buffers.push(buf);
  }
}
