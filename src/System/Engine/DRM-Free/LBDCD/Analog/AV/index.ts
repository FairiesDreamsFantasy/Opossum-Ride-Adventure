/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD RCA Composite Audio/Video (AV) Port Bridge
 */

import { PortDescriptor } from "../../General";

export class LBDCDAVPortBridge {
  public static getPortDescriptor(): PortDescriptor {
    return {
      portType: "RCA Composite AV (Yellow/White/Red)",
      category: "ANALOG",
      bandwidthMbps: 6.0,
      isCaptureFriendly: true,
      pinoutCount: 3,
      protocolStandard: "NTSC 480i (29.97 FPS) / PAL 576i (25 FPS) Baseband Video"
    };
  }

  public static getSyncFrequency(standard: "NTSC" | "PAL"): { hSyncKHz: number; vSyncHz: number } {
    return standard === "NTSC"
      ? { hSyncKHz: 15.734, vSyncHz: 59.94 }
      : { hSyncKHz: 15.625, vSyncHz: 50.0 };
  }
}

export default LBDCDAVPortBridge;
