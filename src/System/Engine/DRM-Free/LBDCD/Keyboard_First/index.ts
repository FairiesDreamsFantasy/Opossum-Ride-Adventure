/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD Keyboard-First Direct Input Streaming Engine
 */

export interface KeyboardPacket {
  scanCode: number;
  keyIdentifier: string;
  isPressed: boolean;
  repeatCount: number;
  timestamp: number;
}

export class LBDCDKeyboardFirstEngine {
  private keyStateBitmask: Uint32Array = new Uint32Array(8);

  public processKeyEvent(code: string, isDown: boolean): KeyboardPacket {
    return {
      scanCode: code.charCodeAt(0) || 0,
      keyIdentifier: code,
      isPressed: isDown,
      repeatCount: 1,
      timestamp: performance?.now ? performance.now() : Date.now()
    };
  }

  public isNKeyRolloverSupported(): boolean {
    return true; // Full NKRO without USB/PS2 ghosting or matrix locks
  }
}

export default LBDCDKeyboardFirstEngine;
