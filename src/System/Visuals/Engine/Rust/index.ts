/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Rust Safe Memory & SIMD Parallel Computation Simulation Engine
 */

export class RustVisualSafeBuffer<T> {
  private data: T[];
  private isBorrowed: boolean = false;

  constructor(initialData: T[] = []) {
    this.data = [...initialData];
  }

  public borrow(): readonly T[] {
    this.isBorrowed = true;
    return Object.freeze([...this.data]);
  }

  public release(): void {
    this.isBorrowed = false;
  }

  public push(item: T): void {
    if (this.isBorrowed) {
      throw new Error("RustBorrowError: Cannot mutate buffer while immutably borrowed.");
    }
    this.data.push(item);
  }

  public len(): number {
    return this.data.length;
  }
}

export default RustVisualSafeBuffer;
