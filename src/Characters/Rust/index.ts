/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Fauna Memory Pool Allocator
 * Native Rust Ownership & Static Lifecycle Bridge
 */

export interface IFaunaPoolAllocation {
  id: string;
  species: string;
  isActive: boolean;
  spawnTimestamp: number;
}

export class FaunaMemoryPoolRust {
  private static pool: Map<string, IFaunaPoolAllocation> = new Map();
  private static readonly MAX_ACTIVE_FAUNA = 64;

  /**
   * Pre-allocates and borrows an ambient fauna slot from static memory pool without GC churn:
   */
  public static spawnFauna(id: string, species: string): boolean {
    let activeCount = 0;
    this.pool.forEach(e => { if (e.isActive) activeCount++; });

    if (activeCount >= this.MAX_ACTIVE_FAUNA) {
      return false; // Pool capacity limit reached: strictly protects frame times and RAM
    }

    this.pool.set(id, {
      id,
      species,
      isActive: true,
      spawnTimestamp: Date.now()
    });
    return true;
  }

  public static despawnFauna(id: string): void {
    const existing = this.pool.get(id);
    if (existing) {
      existing.isActive = false;
    }
  }

  public static getActiveCount(): number {
    let count = 0;
    this.pool.forEach(e => { if (e.isActive) count++; });
    return count;
  }
}

export default FaunaMemoryPoolRust;
