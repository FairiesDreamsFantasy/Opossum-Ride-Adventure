/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Monkey Opponent Concurrency Lock
 * Native Rust Borrow-Checker Bridge
 */

export class MonkeyOpponentLockRust {
  private static activeLocks: Set<string> = new Set();

  public static tryLockOpponent(monkeyId: string): boolean {
    if (this.activeLocks.has(monkeyId)) {
      return false; // Already locked in active swing/taunt interaction
    }
    this.activeLocks.add(monkeyId);
    return true;
  }

  public static unlockOpponent(monkeyId: string): void {
    this.activeLocks.delete(monkeyId);
  }

  public static isLocked(monkeyId: string): boolean {
    return this.activeLocks.has(monkeyId);
  }
}

export default MonkeyOpponentLockRust;
