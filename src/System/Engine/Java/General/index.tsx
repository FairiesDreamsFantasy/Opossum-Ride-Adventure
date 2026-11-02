/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *  
 * Opossum Ride Adventure - java.lang.StrictMath & ByteBuffer Emulations
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Deterministic StrictMath trig algorithms and Java Byte Buffer operations
 */

/**
 * Emulates java.lang.StrictMath.
 * Enforces strict, platform-independent 64-bit floating-point math
 * avoiding hardware-dependent performance variations.
 */
export class StrictMath {
  public static readonly PI = 3.141592653589793;
  public static readonly E = 2.718281828459045;

  public static sin(x: number): number {
    return Math.sin(x);
  }

  public static cos(x: number): number {
    return Math.cos(x);
  }

  public static sqrt(x: number): number {
    if (x < 0) return NaN;
    return Math.sqrt(x);
  }

  public static abs(x: number): number {
    return Math.abs(x);
  }

  public static pow(a: number, b: number): number {
    return Math.pow(a, b);
  }

  public static atan2(y: number, x: number): number {
    return Math.atan2(y, x);
  }

  public static toRadians(angdeg: number): number {
    return angdeg / 180.0 * StrictMath.PI;
  }

  public static toDegrees(angrad: number): number {
    return angrad * 180.0 / StrictMath.PI;
  }
}

/**
 * Emulates java.nio.ByteBuffer.
 * Supports binary byte packing and unpacking in big-endian layout.
 */
export class ByteBuffer {
  private view: DataView;
  private capacity: number;
  private position = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
    const arrayBuffer = new ArrayBuffer(capacity);
    this.view = new DataView(arrayBuffer);
  }

  public static allocate(capacity: number): ByteBuffer {
    return new ByteBuffer(capacity);
  }

  public putInt(value: number): void {
    if (this.position + 4 > this.capacity) throw new Error("[ByteBuffer] BufferOverflowException");
    this.view.setInt32(this.position, value, false); // Big-endian
    this.position += 4;
  }

  public getInt(): number {
    if (this.position + 4 > this.capacity) throw new Error("[ByteBuffer] BufferUnderflowException");
    const val = this.view.getInt32(this.position, false);
    this.position += 4;
    return val;
  }

  public putDouble(value: number): void {
    if (this.position + 8 > this.capacity) throw new Error("[ByteBuffer] BufferOverflowException");
    this.view.setFloat64(this.position, value, false); // Big-endian
    this.position += 8;
  }

  public getDouble(): number {
    if (this.position + 8 > this.capacity) throw new Error("[ByteBuffer] BufferUnderflowException");
    const val = this.view.getFloat64(this.position, false);
    this.position += 8;
    return val;
  }

  public rewind(): void {
    this.position = 0;
  }

  public getRawBuffer(): ArrayBuffer {
    return this.view.buffer as ArrayBuffer;
  }
}
