/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - WebAssembly Emulation, Linear Memory & Opcode Registry
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Mathematical Framework: IEEE 754 Double Precision (64-Bit Float)
 */

export interface WasmPage {
  index: number;
  data: Float64Array;
  bytes: Uint8Array;
}

/**
 * High-precision emulator of WebAssembly linear memory allocations.
 * A single WebAssembly page is defined as 64KB (65,536 bytes).
 */
export class WasmMemoryManager {
  private static PAGE_SIZE = 65536; // 64 KiB
  private pages: WasmPage[] = [];

  constructor(initialPages = 1) {
    for (let i = 0; i < initialPages; i++) {
      this.allocatePage();
    }
  }

  public allocatePage(): number {
    const buffer = new ArrayBuffer(WasmMemoryManager.PAGE_SIZE);
    const page: WasmPage = {
      index: this.pages.length,
      data: new Float64Array(buffer),
      bytes: new Uint8Array(buffer),
    };
    this.pages.push(page);
    return page.index;
  }

  public getPageCount(): number {
    return this.pages.length;
  }

  public writeFloat64(address: number, value: number): void {
    const pageIdx = Math.floor(address / WasmMemoryManager.PAGE_SIZE);
    const offset = address % WasmMemoryManager.PAGE_SIZE;
    if (pageIdx >= this.pages.length) {
      throw new RangeError(`[WASM Memory] Out-of-bounds write attempt at address ${address}`);
    }
    // Float64 occupies 8 bytes
    const view = new DataView(this.pages[pageIdx].bytes.buffer);
    view.setFloat64(offset, value, true); // Little-endian
  }

  public readFloat64(address: number): number {
    const pageIdx = Math.floor(address / WasmMemoryManager.PAGE_SIZE);
    const offset = address % WasmMemoryManager.PAGE_SIZE;
    if (pageIdx >= this.pages.length) {
      throw new RangeError(`[WASM Memory] Out-of-bounds read attempt at address ${address}`);
    }
    const view = new DataView(this.pages[pageIdx].bytes.buffer);
    return view.getFloat64(offset, true);
  }

  public getRawBuffer(): ArrayBuffer {
    // Concatenate all allocated pages into a single buffer
    const totalSize = this.pages.length * WasmMemoryManager.PAGE_SIZE;
    const combined = new Uint8Array(totalSize);
    for (let i = 0; i < this.pages.length; i++) {
      combined.set(this.pages[i].bytes, i * WasmMemoryManager.PAGE_SIZE);
    }
    return combined.buffer;
  }
}

/**
 * Standard WASM opcode map for numeric computations.
 */
export const WASM_OPCODES = {
  // Float64 mathematical operations
  F64_ADD: 0xA0,
  F64_SUB: 0xA1,
  F64_MUL: 0xA2,
  F64_DIV: 0xA3,
  F64_SQRT: 0xA4,
  F64_MIN: 0xA5,
  F64_MAX: 0xA6,
  F64_COPYSIGN: 0xA7,
  F64_ABS: 0x99,
  F64_NEG: 0x9A,
  F64_CEIL: 0x9B,
  F64_FLOOR: 0x9C,
  F64_TRUNC: 0x9D,
  F64_NEAREST: 0x9E,

  // Control Flow
  BLOCK: 0x02,
  LOOP: 0x03,
  IF: 0x04,
  ELSE: 0x05,
  END: 0x0B,
};

/**
 * Converts a floating-point number into its hexadecimal IEEE 754 64-bit binary layout.
 */
export function float64ToHex(val: number): string {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setFloat64(0, val, false); // Big-endian representation
  let hex = "";
  for (let i = 0; i < 8; i++) {
    const byte = view.getUint8(i).toString(16).padStart(2, "0");
    hex += byte;
  }
  return "0x" + hex;
}

/**
 * Decodes a variable-length signed 32-bit integer (LEB128 encoding standard).
 */
export function decodeLEB128(bytes: Uint8Array, offset: { value: number }): number {
  let result = 0;
  let shift = 0;
  let byte = 0;
  while (true) {
    if (offset.value >= bytes.length) {
      throw new Error("[LEB128 Decoder] Unexpected end of byte array");
    }
    byte = bytes[offset.value++];
    result |= (byte & 0x7F) << shift;
    shift += 7;
    if ((byte & 0x80) === 0) {
      break;
    }
  }
  // Sign extension for negative numbers
  if (shift < 32 && (byte & 0x40) !== 0) {
    result |= (~0 << shift);
  }
  return result;
}
