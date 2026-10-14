/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD VGA (DE-15 / 15-pin D-sub) Analog Video Protocol Bridge
 */

import { PortDescriptor } from "../../General";

export class LBDCDVGAPortBridge {
  public static getPortDescriptor(): PortDescriptor {
    return {
      portType: "VGA (DE-15)",
      category: "ANALOG",
      bandwidthMbps: 400,
      isCaptureFriendly: true,
      pinoutCount: 15,
      protocolStandard: "VESA DMT / VESA GTF Analog RGBHV"
    };
  }

  public static calculateDotClockMHz(hTotal: number, vTotal: number, refreshHz: number): number {
    return (hTotal * vTotal * refreshHz) / 1_000_000;
  }
}

export default LBDCDVGAPortBridge;
