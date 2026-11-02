/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Handshake_Bridge General: Virtual Hardware Signal Models
 */

export interface EDIDProfile {
  manufacturerId: string;
  productCode: number;
  nativeResolution: [number, number];
  preferredRefresh: number;
}

export class HandshakeSignalModels {
  /**
   * Generates a virtual Extended Display Identification Data (EDID) block.
   */
  public static generateVirtualEDID(profile: EDIDProfile): Uint8Array {
    const edid = new Uint8Array(128);
    // Header
    edid.set([0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00], 0);
    // Simplified Manufacturer ID
    edid[8] = profile.manufacturerId.charCodeAt(0);
    edid[9] = profile.manufacturerId.charCodeAt(1);
    // Native Resolution (Simplified mapping)
    edid[54] = profile.nativeResolution[0] & 0xff;
    edid[56] = profile.nativeResolution[1] & 0xff;
    return edid;
  }

  /**
   * Models the Display Data Channel (DDC) handshake timing.
   */
  public static calculateHandshakeTimeout(portSpeedMbps: number): number {
    return Math.max(50, 1000 / (portSpeedMbps / 100)); // Minimum 50ms timeout
  }
}

export default HandshakeSignalModels;
