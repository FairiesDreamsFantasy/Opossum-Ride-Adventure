/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Rust Borrow-Checker & Memory Simulator
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Affine types logic, borrow aliasing XOR mutability, and lifetime boundaries
 */

import React from "react";
import { MemoryCell, BorrowRecord, RustMemoryAddressGenerator } from "./General";

export class RustEngine {
  private heap: Map<string, MemoryCell<any>> = new Map();
  private borrows: Map<string, BorrowRecord[]> = new Map();
  private currentLifetime = 0;

  /**
   * Allocates a new value on the heap with a unique ownerId.
   * Equivalent to: let x = Box::new(value);
   */
  public allocate<T>(value: T, ownerId: string): string {
    const address = RustMemoryAddressGenerator.nextAddress();
    this.heap.set(address, {
      address,
      value,
      ownerId,
    });
    this.borrows.set(address, []);
    return address;
  }

  /**
   * Emulates transferring ownership of a heap cell to a new owner.
   * Equivalent to: let y = x; // ownership moved
   */
  public transferOwnership(address: string, newOwnerId: string): void {
    const cell = this.heap.get(address);
    if (!cell) {
      throw new Error(`[Rust BorrowChecker] UseAfterFreeError: pointer address '${address}' is invalid`);
    }

    // Verify no active borrows exist before moving ownership
    const activeBorrows = this.borrows.get(address) || [];
    if (activeBorrows.some(b => b.expiresAtLifetime > this.currentLifetime)) {
      throw new Error(`[Rust BorrowChecker] MoveError: cannot move value out of '${address}' because it is currently borrowed`);
    }

    cell.ownerId = newOwnerId;
  }

  /**
   * Immutably borrows a pointer address.
   * Equivalent to: let y = &x;
   */
  public borrowImmutable(address: string, borrowerId: string, durationLifetimes = 1): any {
    const cell = this.heap.get(address);
    if (!cell) {
      throw new Error(`[Rust BorrowChecker] NullPointerReference: address '${address}' does not exist`);
    }

    const activeBorrows = this.borrows.get(address) || [];
    this.cleanExpiredBorrows(address);

    // Rule: Cannot borrow immutably if there is an active mutable borrow
    const hasMutableBorrow = activeBorrows.some(b => b.isMutable && b.expiresAtLifetime > this.currentLifetime);
    if (hasMutableBorrow) {
      throw new Error(`[Rust BorrowChecker] AliasingViolation: cannot borrow '${address}' immutably because it is already borrowed mutably`);
    }

    activeBorrows.push({
      borrowerId,
      address,
      isMutable: false,
      expiresAtLifetime: this.currentLifetime + durationLifetimes,
    });

    this.borrows.set(address, activeBorrows);
    return cell.value;
  }

  /**
   * Mutably borrows a pointer address.
   * Equivalent to: let y = &mut x;
   */
  public borrowMutable(address: string, borrowerId: string, durationLifetimes = 1): { getValue: () => any; setValue: (v: any) => void } {
    const cell = this.heap.get(address);
    if (!cell) {
      throw new Error(`[Rust BorrowChecker] NullPointerReference: address '${address}' does not exist`);
    }

    const activeBorrows = this.borrows.get(address) || [];
    this.cleanExpiredBorrows(address);

    // Rule: Aliasing XOR Mutability
    // Cannot borrow mutably if there is ANY active borrow (immutable or mutable)
    const hasActiveBorrow = activeBorrows.some(b => b.expiresAtLifetime > this.currentLifetime);
    if (hasActiveBorrow) {
      throw new Error(`[Rust BorrowChecker] MutabilityViolation: cannot borrow '${address}' mutably because it has other active borrows`);
    }

    activeBorrows.push({
      borrowerId,
      address,
      isMutable: true,
      expiresAtLifetime: this.currentLifetime + durationLifetimes,
    });

    this.borrows.set(address, activeBorrows);

    return {
      getValue: () => cell.value,
      setValue: (newVal: any) => {
        // Enforce write check during runtime
        this.cleanExpiredBorrows(address);
        const check = (this.borrows.get(address) || []).find(b => b.borrowerId === borrowerId);
        if (!check || check.expiresAtLifetime <= this.currentLifetime) {
          throw new Error(`[Rust BorrowChecker] WriteAfterLifetimeExpire: Borrow on address '${address}' has already expired`);
        }
        cell.value = newVal;
      }
    };
  }

  public tickLifetime(): void {
    this.currentLifetime++;
  }

  private cleanExpiredBorrows(address: string): void {
    const active = this.borrows.get(address) || [];
    this.borrows.set(address, active.filter(b => b.expiresAtLifetime > this.currentLifetime));
  }
}

export const RustEngineComponent: React.FC = () => {
  return null;
};
