/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - C-Language Pointer Emulation & Custom Struct Memory layouts
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Struct alignment, pointer indexing, and fast memory copies
 */

export interface StructVector3 {
  x: number; // float64 (8 bytes)
  y: number; // float64 (8 bytes)
  z: number; // float64 (8 bytes)
}

export interface StructOpossumState {
  id: number;              // int32 (4 bytes)
  shoulderHeight: number;  // float64 (8 bytes)
  bodyWidth: number;       // float64 (8 bytes)
  bodyLength: number;      // float64 (8 bytes)
  velocity_x: number;      // float64 (8 bytes)
  velocity_y: number;      // float64 (8 bytes)
  isJumping: number;       // int32 (4 bytes)
}

/**
 * Emulates C/C++ style memory pointers using structured Float64 arrays.
 */
export class CMemoryHeap {
  private memory: Float64Array;
  private nextFreeIndex = 0;

  constructor(sizeInBytes = 8192) {
    // 8192 bytes / 8 = 1024 Float64 slots
    this.memory = new Float64Array(sizeInBytes / 8);
  }

  /**
   * C-style malloc
   */
  public malloc(doubleSlotsCount: number): number {
    const ptr = this.nextFreeIndex;
    if (ptr + doubleSlotsCount > this.memory.length) {
      throw new Error("[C Memory] Out of Memory: malloc failed");
    }
    this.nextFreeIndex += doubleSlotsCount;
    return ptr;
  }

  /**
   * C-style pointer write
   */
  public writePointer(ptr: number, offset: number, value: number): void {
    const targetIdx = ptr + offset;
    if (targetIdx >= this.memory.length) {
      throw new RangeError("[C Memory] Segmentation Fault: write out of bounds");
    }
    this.memory[targetIdx] = value;
  }

  /**
   * C-style pointer read
   */
  public readPointer(ptr: number, offset: number): number {
    const targetIdx = ptr + offset;
    if (targetIdx >= this.memory.length) {
      throw new RangeError("[C Memory] Segmentation Fault: read out of bounds");
    }
    return this.memory[targetIdx];
  }

  /**
   * Emulates memcpy (memory copy)
   */
  public memcpy(destPtr: number, srcPtr: number, sizeInSlots: number): void {
    for (let i = 0; i < sizeInSlots; i++) {
      this.writePointer(destPtr, i, this.readPointer(srcPtr, i));
    }
  }

  public freeAll(): void {
    this.nextFreeIndex = 0;
    this.memory.fill(0);
  }
}
