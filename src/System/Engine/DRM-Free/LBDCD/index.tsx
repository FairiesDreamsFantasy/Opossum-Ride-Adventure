/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LBDCDGeneralEngine, LBDCDProtocolHeader, PortDescriptor } from "./General";
import { LBDCDAnalogMasterMatrix } from "./Analog";
import { LBDCDHDMIPortBridge } from "./HDMI";
import { LBDCDAccessibilityFirstEngine } from "./Accessibility_First";
import { LBDCDKeyboardFirstEngine } from "./Keyboard_First";
import { LBDCDUSBPortBridge } from "./USB";
import { LBDCDPS2PortBridge } from "./PS2";
import { LBDCDCOMPortBridge } from "./COM";
import { LBDCDWorksOfflineEngine } from "./Works_Offline";
import { LBDCDLowRAMEngine } from "./Low-RAM";
import { LBDCDLegacyPortsMaster } from "./Legacy_Ports";

export * from "./General";
export * from "./Analog";
export * from "./HDMI";
export * from "./Accessibility_First";
export * from "./Keyboard_First";
export * from "./USB";
export * from "./PS2";
export * from "./COM";
export * from "./Works_Offline";
export * from "./Low-RAM";
export * from "./Legacy_Ports";

/**
 * LBDCD (Low-Bandwidth Digital Content Delivery) Master Engine Subsystem
 * 
 * An open-source, unrestricted DRM-Free alternative to HDCP.
 * Features:
 * - 100% Capture Card & Screen Recording Support (Zero artificial blockouts)
 * - Multi-Port Architecture: Analog (VGA, 3.5mm, RCA AV, S-Video), Digital (HDMI, USB, TOSLINK),
 *   Legacy Serial (PS/2, COM RS-232, Parallel DB-25, MIDI Gameport, DIN-5), and Network (Ethernet RJ-45)
 * - Accessibility-First Telemetry Sync & Keyboard-First Routing
 * - Works_Offline Guarantees with Low-RAM to Unlimited-RAM Adaptability
 */
export class LBDCDMasterEngineSubsystem {
  public readonly General = LBDCDGeneralEngine;
  public readonly Analog = LBDCDAnalogMasterMatrix;
  public readonly HDMI = LBDCDHDMIPortBridge;
  public readonly AccessibilityFirst = LBDCDAccessibilityFirstEngine;
  public readonly KeyboardFirst = new LBDCDKeyboardFirstEngine();
  public readonly USB = LBDCDUSBPortBridge;
  public readonly PS2 = LBDCDPS2PortBridge;
  public readonly COM = LBDCDCOMPortBridge;
  public readonly WorksOffline = LBDCDWorksOfflineEngine;
  public readonly LowRAM = LBDCDLowRAMEngine;
  public readonly LegacyPorts = LBDCDLegacyPortsMaster;

  /**
   * Retrieves all supported physical port descriptors across modern and legacy hardware.
   */
  public getAllSupportedPorts(): PortDescriptor[] {
    return [
      ...this.Analog.getAllAnalogPorts(),
      this.HDMI.getPortDescriptor(),
      ...this.USB.getSupportedUSBStandards(),
      this.PS2.getPortDescriptor("KEYBOARD"),
      this.PS2.getPortDescriptor("MOUSE"),
      ...this.COM.getSupportedCOMPorts(),
      ...this.LegacyPorts.getExtendedLegacyPorts()
    ];
  }

  /**
   * Generates active stream status showing 100% DRM-Free open capture compatibility.
   */
  public getStreamDiagnostics(): {
    protocol: string;
    drmFree: true;
    hdcpSuppressed: true;
    captureCardsSupported: true;
    totalPortsAvailable: number;
    ramProfile: ReturnType<typeof LBDCDLowRAMEngine.getRAMProfile>;
  } {
    return {
      protocol: "LBDCD_v1.0.0_OPEN_STREAM",
      drmFree: true,
      hdcpSuppressed: true,
      captureCardsSupported: true,
      totalPortsAvailable: this.getAllSupportedPorts().length,
      ramProfile: this.LowRAM.getRAMProfile()
    };
  }
}

export const LBDCD = new LBDCDMasterEngineSubsystem();
export default LBDCD;
