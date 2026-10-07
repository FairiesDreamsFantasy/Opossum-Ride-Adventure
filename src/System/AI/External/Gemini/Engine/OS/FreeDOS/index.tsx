/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class FreeDOSBridge {
  public static readonly mode = "Real Mode (16-bit)";
  public static executeInterrupt(intCode: number): void {
    console.log(`FREEDOS_INT: 0x${intCode.toString(16)}`);
  }
}
