/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HandshakeSignalModels, EDIDProfile } from "./General";

export * from "./General";

/**
 * Handshake_Bridge Master Subsystem
 * 
 * "Tricks" recording hardware and legacy ports into 
 * accepting high-fidelity signals by emulating virtual 
 * hardware signatures.
 */
export class HandshakeBridgeSubsystem {
  private activeEDID: EDIDProfile = {
    manufacturerId: "OPS",
    productCode: 2043,
    nativeResolution: [3840, 2160],
    preferredRefresh: 60
  };

  public getActiveEDID(): Uint8Array {
    return HandshakeSignalModels.generateVirtualEDID(this.activeEDID);
  }

  public setDisplayProfile(profile: EDIDProfile): void {
    this.activeEDID = { ...profile };
  }

  public getStatus(): {
    bridgeActive: true;
    hdcpBypass: true;
    emulatedHardware: string;
  } {
    return {
      bridgeActive: true,
      hdcpBypass: true,
      emulatedHardware: `OPOSSUM_VIRTUAL_MONITOR_${this.activeEDID.productCode}`
    };
  }
}

export const HandshakeBridge = new HandshakeBridgeSubsystem();
export default HandshakeBridge;
