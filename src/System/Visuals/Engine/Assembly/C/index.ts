/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * C Native Fast Memory & Struct Emulation Subsystem
 */

export class CNativeBufferBridge {
  public static allocatePixelBuffer(size: number): Uint32Array {
    return new Uint32Array(size);
  }

  public static fastMemcpy(dest: Uint32Array, src: Uint32Array, length: number): void {
    dest.set(src.subarray(0, length));
  }
}

export default CNativeBufferBridge;
