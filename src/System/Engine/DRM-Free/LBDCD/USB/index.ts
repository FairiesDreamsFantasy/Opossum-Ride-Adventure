/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD USB Multi-Port (USB-A, USB-B, Micro-USB, USB-C) Architecture Bridge
 */

import { PortDescriptor } from "../General";

export class LBDCDUSBPortBridge {
  public static getSupportedUSBStandards(): PortDescriptor[] {
    return [
      {
        portType: "USB 1.1 / 2.0 (Type-A / Type-B)",
        category: "DIGITAL",
        bandwidthMbps: 480,
        isCaptureFriendly: true,
        pinoutCount: 4,
        protocolStandard: "USB HID / UVC 1.1 / UAC 1.0"
      },
      {
        portType: "USB 3.0 / 3.2 Gen 1 (SuperSpeed)",
        category: "DIGITAL",
        bandwidthMbps: 5000,
        isCaptureFriendly: true,
        pinoutCount: 9,
        protocolStandard: "USB 3.0 SuperSpeed UVC Capture Device Class"
      },
      {
        portType: "USB Type-C (DP Alt-Mode / Thunderbolt)",
        category: "DIGITAL",
        bandwidthMbps: 40000,
        isCaptureFriendly: true,
        pinoutCount: 24,
        protocolStandard: "USB4 / DisplayPort 1.4 Alternate Mode Direct Framepipe"
      }
    ];
  }

  public static isUVCCompliant(): boolean {
    return true; // Driverless USB Video Class capture compatibility
  }
}

export default LBDCDUSBPortBridge;
