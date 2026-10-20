/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD Open HDMI / DVI Unencrypted Passthrough Engine
 */

import { PortDescriptor } from "../General";

export class LBDCDHDMIPortBridge {
  public static getPortDescriptor(): PortDescriptor {
    return {
      portType: "HDMI 2.0 / 2.1 (Type-A)",
      category: "DIGITAL",
      bandwidthMbps: 18000, // 18 Gbps HDMI 2.0 uncompressed
      isCaptureFriendly: true, // 100% Capture card compatible - No HDCP encryption handshake
      pinoutCount: 19,
      protocolStandard: "CEA-861 / TMDS / FRL Unencrypted Audio-Video Stream"
    };
  }

  public static isHDCPSuppressed(): boolean {
    return true; // DRM-Free: Never sends HDCP keys to block capture hardware
  }

  public static getSupportedResolutions(): string[] {
    return [
      "1920x1080 @ 60Hz",
      "1920x1080 @ 120Hz",
      "2560x1440 @ 60Hz",
      "3840x2160 @ 60Hz"
    ];
  }
}

export default LBDCDHDMIPortBridge;
