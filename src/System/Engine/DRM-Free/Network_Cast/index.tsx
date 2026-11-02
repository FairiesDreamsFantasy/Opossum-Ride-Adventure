/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NetworkCastProtocols, CastPacket } from "./General";

export * from "./General";

/**
 * Network_Cast Master Subsystem
 * 
 * Enables zero-telemetry local network streaming. Allows the 
 * game to be cast to any device on the LAN without cloud authentication.
 */
export class NetworkCastSubsystem {
  private sequence: number = 0;

  public createPacket(payload: Uint8Array): CastPacket {
    return {
      header: "OPSCAST",
      seq: this.sequence++,
      payload,
      checksum: NetworkCastProtocols.calculateChecksum(payload)
    };
  }

  public getStatus(): {
    networkMode: "OPEN_LAN_ONLY";
    discoveryActive: true;
    cloudVerificationRequired: false;
  } {
    return {
      networkMode: "OPEN_LAN_ONLY",
      discoveryActive: true,
      cloudVerificationRequired: false
    };
  }
}

export const NetworkCast = new NetworkCastSubsystem();
export default NetworkCast;
