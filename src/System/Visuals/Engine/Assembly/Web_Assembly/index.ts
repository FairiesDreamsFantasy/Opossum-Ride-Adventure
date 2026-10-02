/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WebAssembly Binary Linear Memory Interface
 */

export class WASMVisualMemoryBridge {
  private memory: WebAssembly.Memory;

  constructor(initialPages: number = 2) {
    this.memory = new WebAssembly.Memory({ initial: initialPages, maximum: 10 });
  }

  public getBuffer(): ArrayBuffer {
    return this.memory.buffer;
  }

  public getUint8View(): Uint8Array {
    return new Uint8Array(this.memory.buffer);
  }
}

export default WASMVisualMemoryBridge;
