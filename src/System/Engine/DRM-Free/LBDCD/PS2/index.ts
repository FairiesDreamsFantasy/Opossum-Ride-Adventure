/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD PS/2 (Mini-DIN 6-Pin) Dual-Port Interrupt Controller Bridge
 */

import { PortDescriptor } from "../General";

export class LBDCDPS2PortBridge {
  public static getPortDescriptor(type: "KEYBOARD" | "MOUSE" = "KEYBOARD"): PortDescriptor {
    return {
      portType: `PS/2 6-Pin Mini-DIN (${type === "KEYBOARD" ? "Purple / IRQ 1" : "Green / IRQ 12"})`,
      category: "SERIAL_LEGACY",
      bandwidthMbps: 0.016, // 10-16.7 kHz clock rate
      isCaptureFriendly: true,
      pinoutCount: 6,
      protocolStandard: "IBM PS/2 Synchronous Serial Protocol (Data, Clock, VCC, GND)"
    };
  }

  public static decodeScanCodeSet2(makeCode: number): string {
    // Standard Scan Code Set 2 translations
    switch (makeCode) {
      case 0x1d: return "KeyW";
      case 0x1c: return "KeyA";
      case 0x1b: return "KeyS";
      case 0x23: return "KeyD";
      case 0x29: return "Space";
      default: return "Unknown";
    }
  }
}

export default LBDCDPS2PortBridge;
