/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - System Registry Immutable Contract
 * C# (.NET Strong-Type Emulation Bridge)
 */

export class SystemRegistryContractCSharp {
  private static readonly REGISTRY_STAMP = "Opossum-System-Registry-v0.1.0.8";

  public static getRegistryStamp(): string {
    return this.REGISTRY_STAMP;
  }

  /**
   * C#-style Immutable Frame & Acoustic Invariant Guard.
   * Ensures delta time, player Z, and audio gain remain finite and bounded.
   */
  public static validateFrameAndAcousticInvariants(
    deltaSec: number,
    playerZ: number,
    masterGain: number
  ): { safeDeltaSec: number; safePlayerZ: number; safeMasterGain: number; valid: boolean } {
    const valid = Number.isFinite(deltaSec) && Number.isFinite(playerZ) && Number.isFinite(masterGain);
    return {
      safeDeltaSec: Number.isFinite(deltaSec) ? Math.max(0.0005, Math.min(0.05, deltaSec)) : 0.016667,
      safePlayerZ: Number.isFinite(playerZ) ? Math.max(-500, playerZ) : 0,
      safeMasterGain: Number.isFinite(masterGain) ? Math.max(0, Math.min(2.0, masterGain)) : 1.0,
      valid
    };
  }
}

export default SystemRegistryContractCSharp;
