/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Rust Sound Thread-Safe Audio Ring Buffer Simulator
 */

export class RustSoundRingBuffer {
  private buffer: Float32Array;
  private writePos = 0;
  private readPos = 0;

  constructor(public capacity: number = 4096) {
    this.buffer = new Float32Array(capacity);
  }

  public write(sample: number): boolean {
    const nextWrite = (this.writePos + 1) % this.capacity;
    if (nextWrite === this.readPos) return false; // Buffer full
    this.buffer[this.writePos] = sample;
    this.writePos = nextWrite;
    return true;
  }

  public read(): number | null {
    if (this.readPos === this.writePos) return null; // Buffer empty
    const val = this.buffer[this.readPos];
    this.readPos = (this.readPos + 1) % this.capacity;
    return val;
  }
}

export default RustSoundRingBuffer;
