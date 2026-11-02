/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WebAssembly Sound Audio Worklet Ring Buffer Interface
 */

export class WASMSoundMemoryBridge {
  private memory: WebAssembly.Memory;

  constructor(initialPages: number = 4) {
    this.memory = new WebAssembly.Memory({ initial: initialPages, maximum: 16 });
  }

  public getFloat32View(): Float32Array {
    return new Float32Array(this.memory.buffer);
  }
}

export default WASMSoundMemoryBridge;
