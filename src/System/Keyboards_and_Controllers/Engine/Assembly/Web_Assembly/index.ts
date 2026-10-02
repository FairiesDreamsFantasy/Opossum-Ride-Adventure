/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WebAssembly Input Fast State Array Bridge
 */

export class WASMInputMemoryBridge {
  private memory: WebAssembly.Memory;

  constructor(initialPages: number = 1) {
    this.memory = new WebAssembly.Memory({ initial: initialPages, maximum: 4 });
  }

  public getUint8View(): Uint8Array {
    return new Uint8Array(this.memory.buffer);
  }
}

export default WASMInputMemoryBridge;
