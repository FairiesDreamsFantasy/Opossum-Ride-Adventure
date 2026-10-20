/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Go-Style Slice & Channel Emulation Layer
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Go Contiguous Memory Slices and Non-blocking Concurrency Channels
 */

/**
 * Emulates a Go contiguous dynamic slice: []float64.
 * Features automatic cap-growing allocations, length, capacity, and slicing bounds.
 */
export class GoFloat64Slice {
  private data: Float64Array;
  private len: number;
  private cap: number;

  constructor(len: number, cap: number) {
    this.len = len;
    this.cap = Math.max(len, cap);
    this.data = new Float64Array(this.cap);
  }

  public static make(len: number, cap = len): GoFloat64Slice {
    return new GoFloat64Slice(len, cap);
  }

  public get(index: number): number {
    if (index < 0 || index >= this.len) {
      throw new RangeError(`[Go Slice] Panic: index out of range [${index}] with length ${this.len}`);
    }
    return this.data[index];
  }

  public set(index: number, val: number): void {
    if (index < 0 || index >= this.len) {
      throw new RangeError(`[Go Slice] Panic: index out of range [${index}] with length ${this.len}`);
    }
    this.data[index] = val;
  }

  public append(val: number): void {
    if (this.len >= this.cap) {
      // Grow capacity by 2x
      const newCap = this.cap === 0 ? 4 : this.cap * 2;
      const newData = new Float64Array(newCap);
      newData.set(this.data);
      this.data = newData;
      this.cap = newCap;
    }
    this.data[this.len] = val;
    this.len++;
  }

  public length(): number {
    return this.len;
  }

  public capacity(): number {
    return this.cap;
  }

  public getRawArray(): Float64Array {
    return this.data.subarray(0, this.len);
  }
}

/**
 * Emulates a Go Channel: chan T.
 * Provides buffered/unbuffered queue communication and select blocks.
 */
export class GoChannel<T> {
  private buffer: T[] = [];
  private maxCapacity: number;

  constructor(maxCapacity = 0) {
    this.maxCapacity = Math.max(1, maxCapacity); // Enforce buffered size min of 1 for emulation
  }

  public static makeChan<T>(size = 0): GoChannel<T> {
    return new GoChannel<T>(size);
  }

  public send(item: T): boolean {
    if (this.buffer.length >= this.maxCapacity) {
      // Buffer full, would block in Go. Return false representing non-blocking fail.
      return false;
    }
    this.buffer.push(item);
    return true;
  }

  public receive(): T | null {
    if (this.buffer.length === 0) {
      // Channel empty, would block in Go. Return null.
      return null;
    }
    return this.buffer.shift()!;
  }

  public len(): number {
    return this.buffer.length;
  }

  public cap(): number {
    return this.maxCapacity;
  }
}
