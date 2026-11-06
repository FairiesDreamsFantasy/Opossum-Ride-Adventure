/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Daisy Rose Dedicated Borrow Guard
 * Native Rust Memory Safety Bridge
 */

export class DaisyRoseStateLockRust {
  private static isLocked = false;

  public static acquireLock(): boolean {
    if (this.isLocked) return false;
    this.isLocked = true;
    return true;
  }

  public static releaseLock(): void {
    this.isLocked = false;
  }
}

export default DaisyRoseStateLockRust;
