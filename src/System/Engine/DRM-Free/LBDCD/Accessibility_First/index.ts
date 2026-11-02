/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD Accessibility-First Telemetry & Assistive Bridge
 */

export interface AccessibilityStreamPacket {
  riderCoordinates: { x: number; y: number; z: number };
  activeOpossumId: string;
  nearbyInteractable: string | null;
  compassHeadingDegrees: number;
  screenReaderCues: string[];
  timestamp: number;
}

export class LBDCDAccessibilityFirstEngine {
  public static createAccessibilityPacket(
    coords: { x: number; y: number; z: number },
    opossumId: string,
    interactable: string | null,
    heading: number,
    cues: string[]
  ): AccessibilityStreamPacket {
    return {
      riderCoordinates: { ...coords },
      activeOpossumId: opossumId,
      nearbyInteractable: interactable,
      compassHeadingDegrees: Math.round(heading),
      screenReaderCues: [...cues],
      timestamp: Date.now()
    };
  }

  public static serializeForAssistivePort(packet: AccessibilityStreamPacket): string {
    return `POS:(${packet.riderCoordinates.x.toFixed(1)},${packet.riderCoordinates.y.toFixed(1)},${packet.riderCoordinates.z.toFixed(1)})|OP:${packet.activeOpossumId}|DIR:${packet.compassHeadingDegrees}|OBJ:${packet.nearbyInteractable || "NONE"}`;
  }
}

export default LBDCDAccessibilityFirstEngine;
