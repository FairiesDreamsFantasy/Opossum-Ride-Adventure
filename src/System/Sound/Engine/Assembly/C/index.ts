/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * C Sound Native Fast PCM Audio Sample Buffer
 */

export class CSoundNativeBufferBridge {
  public static mixBuffers(dest: Float32Array, src: Float32Array, gain: number = 1.0): void {
    const len = Math.min(dest.length, src.length);
    for (let i = 0; i < len; i++) {
      dest[i] += src[i] * gain;
    }
  }
}

export default CSoundNativeBufferBridge;
