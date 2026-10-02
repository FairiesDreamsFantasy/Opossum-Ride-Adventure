/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * C Input Polling & Hardware Interrupt Ring Buffer
 */

export class CInputNativeBufferBridge {
  public static copyKeyStates(dest: Uint32Array, src: Uint32Array): void {
    dest.set(src);
  }
}

export default CInputNativeBufferBridge;
