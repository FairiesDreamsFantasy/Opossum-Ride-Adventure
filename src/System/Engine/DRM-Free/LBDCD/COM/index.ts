/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD COM (RS-232 / RS-422 / RS-485 / DB-9 / DB-25) Serial Port Bridge
 */

import { PortDescriptor } from "../General";

export class LBDCDCOMPortBridge {
  public static getSupportedCOMPorts(): PortDescriptor[] {
    return [
      {
        portType: "COM (DB-9 / DE-9 Serial RS-232)",
        category: "SERIAL_LEGACY",
        bandwidthMbps: 0.1152, // 115,200 baud standard
        isCaptureFriendly: true,
        pinoutCount: 9,
        protocolStandard: "EIA/TIA-232-E Asynchronous Serial (RxD, TxD, RTS, CTS, DTR, DSR, DCD, RI, GND)"
      },
      {
        portType: "COM (DB-25 Vintage Serial)",
        category: "SERIAL_LEGACY",
        bandwidthMbps: 0.1152,
        isCaptureFriendly: true,
        pinoutCount: 25,
        protocolStandard: "EIA-232 Full 25-pin Instrumentation & Terminal Interface"
      }
    ];
  }

  public static formatSerialTelemetry(coords: { x: number; y: number; z: number }, speed: number): Uint8Array {
    const str = `$OPPOSSUM,X:${coords.x.toFixed(1)},Y:${coords.y.toFixed(1)},Z:${coords.z.toFixed(1)},SPD:${speed.toFixed(1)}*\r\n`;
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }
}

export default LBDCDCOMPortBridge;
