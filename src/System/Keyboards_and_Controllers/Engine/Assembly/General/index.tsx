/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * General Hardware Input Polling & State Bitmask Manager
 */

export class InputAssemblyGeneral {
  public static createBitmask(): Uint32Array {
    return new Uint32Array(8); // 256 bits for key states
  }

  public static setKeyBit(mask: Uint32Array, keyCode: number, pressed: boolean): void {
    const idx = (keyCode >> 5) & 7;
    const bit = 1 << (keyCode & 31);
    if (pressed) {
      mask[idx] |= bit;
    } else {
      mask[idx] &= ~bit;
    }
  }

  public static isKeyPressed(mask: Uint32Array, keyCode: number): boolean {
    const idx = (keyCode >> 5) & 7;
    const bit = 1 << (keyCode & 31);
    return (mask[idx] & bit) !== 0;
  }
}

export default InputAssemblyGeneral;
