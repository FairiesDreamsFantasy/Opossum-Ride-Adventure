/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LBDCDVGAPortBridge } from "./VGA";
import { LBDCDAudioJackPortBridge } from "./3.5MM";
import { LBDCDAVPortBridge } from "./AV";
import { LBDCDSVideoPortBridge } from "./S-Video";
import { PortDescriptor } from "../General";

export * from "./VGA";
export * from "./3.5MM";
export * from "./AV";
export * from "./S-Video";

export class LBDCDAnalogMasterMatrix {
  public static readonly VGA = LBDCDVGAPortBridge;
  public static readonly AudioJack = LBDCDAudioJackPortBridge;
  public static readonly AV = LBDCDAVPortBridge;
  public static readonly SVideo = LBDCDSVideoPortBridge;

  public static getAllAnalogPorts(): PortDescriptor[] {
    return [
      this.VGA.getPortDescriptor(),
      this.AudioJack.getPortDescriptor(),
      this.AV.getPortDescriptor(),
      this.SVideo.getPortDescriptor()
    ];
  }
}

export default LBDCDAnalogMasterMatrix;
