/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - World Progression State Machine
 * C# (.NET Strong-Type Emulation Bridge)
 */

export class WorldProgressionFSM_CSharp {
  private static unlockedWorlds: Set<number> = new Set([1]);

  public static isWorldUnlocked(worldNumber: number): boolean {
    return this.unlockedWorlds.has(worldNumber);
  }

  public static unlockWorld(worldNumber: number): void {
    this.unlockedWorlds.add(worldNumber);
  }
}

export default WorldProgressionFSM_CSharp;
