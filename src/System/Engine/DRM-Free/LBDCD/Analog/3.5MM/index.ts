/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD 3.5mm TRS/TRRS Analog Stereo & Mic Audio Port Bridge
 */

import { PortDescriptor } from "../../General";

export class LBDCDAudioJackPortBridge {
  public static getPortDescriptor(): PortDescriptor {
    return {
      portType: "3.5mm TRS/TRRS Analog Jack",
      category: "ANALOG",
      bandwidthMbps: 1.411, // 44.1kHz 16-bit stereo equivalent
      isCaptureFriendly: true,
      pinoutCount: 4,
      protocolStandard: "CTIA / OMTP Standard 3.5mm Stereo Line-Out"
    };
  }

  public static formatAudioLevels(leftGain: number, rightGain: number): { leftVol: number; rightVol: number } {
    return {
      leftVol: Math.max(0, Math.min(1, leftGain)),
      rightVol: Math.max(0, Math.min(1, rightGain))
    };
  }
}

export default LBDCDAudioJackPortBridge;
