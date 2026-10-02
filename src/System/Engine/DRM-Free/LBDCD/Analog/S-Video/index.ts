/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD S-Video (Separate Video 4-pin Mini-DIN) Port Bridge
 */

import { PortDescriptor } from "../../General";

export class LBDCDSVideoPortBridge {
  public static getPortDescriptor(): PortDescriptor {
    return {
      portType: "S-Video (Mini-DIN 4-pin)",
      category: "ANALOG",
      bandwidthMbps: 8.5,
      isCaptureFriendly: true,
      pinoutCount: 4,
      protocolStandard: "Y/C Component Video (Luminance + Chrominance)"
    };
  }

  public static getPinoutMapping(): Record<number, string> {
    return {
      1: "GND (Y Ground)",
      2: "GND (C Ground)",
      3: "Y (Luminance Intensity)",
      4: "C (Chrominance Subcarrier 3.58MHz/4.43MHz)"
    };
  }
}

export default LBDCDSVideoPortBridge;
