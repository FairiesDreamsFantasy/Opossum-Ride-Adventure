/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD Legacy Multi-Port Expansion Bridges
 * Provides hardware interfaces for Parallel/IEEE 1284, MIDI/Gameport, DIN-5 AT, Ethernet, and Optical S/PDIF.
 */

import { PortDescriptor } from "../General";

export class LBDCDLegacyPortsMaster {
  public static getExtendedLegacyPorts(): PortDescriptor[] {
    return [
      {
        portType: "Parallel / IEEE 1284 (DB-25)",
        category: "SERIAL_LEGACY",
        bandwidthMbps: 2.0, // ECP/EPP mode
        isCaptureFriendly: true,
        pinoutCount: 25,
        protocolStandard: "IEEE 1284 Bidirectional Parallel Port (Strobe, Busy, Ack, Data 0-7)"
      },
      {
        portType: "MIDI / DA-15 Joystick Gameport",
        category: "SERIAL_LEGACY",
        bandwidthMbps: 0.03125, // 31.25 kbaud MIDI
        isCaptureFriendly: true,
        pinoutCount: 15,
        protocolStandard: "Standard IBM DA-15 Analog Joystick + Opto-Isolated 5-pin MIDI Out"
      },
      {
        portType: "DIN-5 (AT Keyboard 180° DIN)",
        category: "SERIAL_LEGACY",
        bandwidthMbps: 0.010,
        isCaptureFriendly: true,
        pinoutCount: 5,
        protocolStandard: "IBM PC/AT 5-pin Circular DIN Keyboard Clock & Data"
      },
      {
        portType: "Ethernet (RJ-45 8P8C)",
        category: "NETWORK",
        bandwidthMbps: 1000,
        isCaptureFriendly: true,
        pinoutCount: 8,
        protocolStandard: "IEEE 802.3 10BASE-T / 100BASE-TX / 1000BASE-T UDP Multicast Framepipe"
      },
      {
        portType: "Optical TOSLINK / Coaxial S/PDIF",
        category: "DIGITAL",
        bandwidthMbps: 3.1,
        isCaptureFriendly: true,
        pinoutCount: 1,
        protocolStandard: "IEC 60958 / IEC 61937 Uncompressed Stereo PCM Audio Optical Stream"
      }
    ];
  }
}

export default LBDCDLegacyPortsMaster;
