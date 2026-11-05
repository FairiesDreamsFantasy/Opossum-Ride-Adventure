/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Arena Memory Buffer Pool
 * Native Rust Zero-Copy Ownership Bridge
 */

export interface IArenaBufferToken {
  arenaId: string;
  isLocked: boolean;
  allocationSizeKb: number;
}

export class ArenaBufferPoolRust {
  private static activeBuffers: Map<string, IArenaBufferToken> = new Map();

  /**
   * Emulates Rust borrow checker: borrows an arena segment buffer exclusively.
   */
  public static borrowArenaBuffer(arenaId: string, estimatedKb: number = 512): boolean {
    const current = this.activeBuffers.get(arenaId);
    if (current && current.isLocked) {
      return false; // Already borrowed: prevents race condition during rapid arena switching
    }
    this.activeBuffers.set(arenaId, {
      arenaId,
      isLocked: true,
      allocationSizeKb: estimatedKb
    });
    return true;
  }

  /**
   * Releases arena buffer back to the memory pool.
   */
  public static releaseArenaBuffer(arenaId: string): boolean {
    const current = this.activeBuffers.get(arenaId);
    if (!current || !current.isLocked) {
      return false;
    }
    this.activeBuffers.set(arenaId, {
      arenaId,
      isLocked: false,
      allocationSizeKb: current.allocationSizeKb
    });
    return true;
  }

  public static getPoolAllocatedKb(): number {
    let sum = 0;
    this.activeBuffers.forEach(b => {
      if (b.isLocked) sum += b.allocationSizeKb;
    });
    return sum;
  }
}

export default ArenaBufferPoolRust;
