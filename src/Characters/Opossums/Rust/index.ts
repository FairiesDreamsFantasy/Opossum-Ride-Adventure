/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Opossum State Guard
 * Native Rust Zero-Copy Ownership Bridge
 */

export interface IOpossumStateLock {
  id: string;
  isLocked: boolean;
  timestamp: number;
}

export class OpossumStateGuardRust {
  private static locks: Map<string, IOpossumStateLock> = new Map();

  /**
   * Emulates Rust borrow checker: acquires mutable reference to character state.
   */
  public static acquireExclusiveLock(characterId: string): boolean {
    const current = this.locks.get(characterId);
    if (current && current.isLocked) {
      return false; // Borrow check failure: already mutably borrowed
    }
    this.locks.set(characterId, {
      id: characterId,
      isLocked: true,
      timestamp: Date.now()
    });
    return true;
  }

  /**
   * Releases mutable reference back to immutable state pool.
   */
  public static releaseExclusiveLock(characterId: string): boolean {
    const current = this.locks.get(characterId);
    if (!current || !current.isLocked) {
      return false;
    }
    this.locks.set(characterId, {
      id: characterId,
      isLocked: false,
      timestamp: Date.now()
    });
    return true;
  }

  public static isStateSecured(characterId: string): boolean {
    const lock = this.locks.get(characterId);
    return lock ? lock.isLocked : false;
  }
}

export default OpossumStateGuardRust;
