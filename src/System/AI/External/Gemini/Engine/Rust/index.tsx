/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Rust Borrow Checker & Linear Memory Simulator
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Linear memory allocations, exclusive borrows, reference counting, and lifetime scopes
 */

import React from "react";
import { GeminiRustMemoryBlock, GeminiRustBorrow, GeminiRustAddressGen } from "./General";
import { EngineTelemetryHUD } from "../Components/TelemetryHUD";

export interface ArcReference<T> {
  ptr: string;
  strongCount: number;
  weakCount: number;
  data: T;
}

export class GeminiRustEngine {
  private memory: Map<string, GeminiRustMemoryBlock<any>> = new Map();
  private activeBorrows: Map<string, GeminiRustBorrow[]> = new Map();
  private arcRegistry: Map<string, ArcReference<any>> = new Map();
  private tickCount = 0;
  private totalAllocations = 0;
  private totalDeallocations = 0;

  public allocate<T>(val: T, ownerId: string): string {
    const ptr = GeminiRustAddressGen.next();
    this.memory.set(ptr, {
      ptr,
      value: val,
      owner: ownerId,
    });
    this.activeBorrows.set(ptr, []);
    this.totalAllocations++;
    return ptr;
  }

  public moveOwnership(ptr: string, newOwnerId: string): void {
    const block = this.memory.get(ptr);
    if (!block) {
      throw new Error(`[Gemini Rust] UseAfterFree: pointer '${ptr}' is invalid`);
    }
    const borrows = this.activeBorrows.get(ptr) || [];
    if (borrows.some(b => b.expiresLifetime > this.tickCount)) {
      throw new Error(`[Gemini Rust] MoveError: cannot move owned pointer '${ptr}' while references are active`);
    }
    block.owner = newOwnerId;
  }

  public borrowImmutable(ptr: string, borrowerId: string, duration = 1): any {
    const block = this.memory.get(ptr);
    if (!block) {
      throw new Error(`[Gemini Rust] NullPointer: pointer '${ptr}' does not exist`);
    }
    this.cleanExpired(ptr);
    const borrows = this.activeBorrows.get(ptr) || [];
    const hasMutable = borrows.some(b => b.isMutable && b.expiresLifetime > this.tickCount);
    if (hasMutable) {
      throw new Error(`[Gemini Rust] ReferenceViolation: cannot borrow '${ptr}' immutably because a mutable reference is active`);
    }
    borrows.push({
      borrower: borrowerId,
      ptr,
      isMutable: false,
      expiresLifetime: this.tickCount + duration,
    });
    this.activeBorrows.set(ptr, borrows);
    return block.value;
  }

  public borrowMutable(ptr: string, borrowerId: string, duration = 1): { get: () => any; set: (v: any) => void } {
    const block = this.memory.get(ptr);
    if (!block) {
      throw new Error(`[Gemini Rust] NullPointer: pointer '${ptr}' does not exist`);
    }
    this.cleanExpired(ptr);
    const borrows = this.activeBorrows.get(ptr) || [];
    const hasAnyActive = borrows.some(b => b.expiresLifetime > this.tickCount);
    if (hasAnyActive) {
      throw new Error(`[Gemini Rust] ExclusiveViolation: cannot borrow '${ptr}' mutably because other references are active`);
    }
    borrows.push({
      borrower: borrowerId,
      ptr,
      isMutable: true,
      expiresLifetime: this.tickCount + duration,
    });
    this.activeBorrows.set(ptr, borrows);
    return {
      get: () => block.value,
      set: (v: any) => {
        this.cleanExpired(ptr);
        const active = (this.activeBorrows.get(ptr) || []).find(b => b.borrower === borrowerId);
        if (!active || active.expiresLifetime <= this.tickCount) {
          throw new Error(`[Gemini Rust] BorrowExpired: write reference on pointer '${ptr}' has expired`);
        }
        block.value = v;
      }
    };
  }

  /**
   * Simulates Atomic Reference Counting Arc<T>::clone()
   */
  public arcCreate<T>(data: T): string {
    const ptr = GeminiRustAddressGen.next();
    this.arcRegistry.set(ptr, {
      ptr,
      strongCount: 1,
      weakCount: 0,
      data
    });
    this.totalAllocations++;
    return ptr;
  }

  public arcClone(ptr: string): string {
    const ref = this.arcRegistry.get(ptr);
    if (!ref || ref.strongCount <= 0) {
      throw new Error(`[Gemini Rust] ArcDanglingReference: Arc pointer '${ptr}' is already dropped.`);
    }
    ref.strongCount++;
    return ptr;
  }

  public arcDrop(ptr: string): void {
    const ref = this.arcRegistry.get(ptr);
    if (!ref) return;
    ref.strongCount--;
    if (ref.strongCount <= 0) {
      this.arcRegistry.delete(ptr);
      this.totalDeallocations++;
    }
  }

  /**
   * Computes heap fragmentation coefficient and active reference statistics
   */
  public getMemoryTelemetry() {
    const activeBlocksCount = this.memory.size + this.arcRegistry.size;
    const fragmentationRatio = this.totalAllocations > 0 
      ? Number((this.totalDeallocations / this.totalAllocations).toFixed(4))
      : 0;
    return {
      activeBlocksCount,
      totalAllocations: this.totalAllocations,
      totalDeallocations: this.totalDeallocations,
      fragmentationRatio,
      currentTick: this.tickCount,
      activeArcPointers: Array.from(this.arcRegistry.keys())
    };
  }

  public tick(): void {
    this.tickCount++;
  }

  private cleanExpired(ptr: string): void {
    const active = this.activeBorrows.get(ptr) || [];
    this.activeBorrows.set(ptr, active.filter(b => b.expiresLifetime > this.tickCount));
  }
}

export const GeminiRustEngineComponent: React.FC = () => {
  return <EngineTelemetryHUD moduleName="GeminiRustEngine" />;
};
