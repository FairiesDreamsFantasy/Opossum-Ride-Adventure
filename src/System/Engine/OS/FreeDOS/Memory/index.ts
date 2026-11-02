/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FreeDOS Conventional & Extended Memory Subsystem
 */

export class FreeDOSMemoryEngine {
  // 1MB real-mode address space (1024 * 1024 bytes)
  private memoryBuffer: Uint8Array = new Uint8Array(1024 * 1024);

  public write8(address: number, val: number): void {
    if (address >= 0 && address < this.memoryBuffer.length) {
      this.memoryBuffer[address] = val & 0xff;
    }
  }

  public read8(address: number): number {
    if (address >= 0 && address < this.memoryBuffer.length) {
      return this.memoryBuffer[address];
    }
    return 0;
  }

  public write16(address: number, val: number): void {
    this.write8(address, val & 0xff);
    this.write8(address + 1, (val >> 8) & 0xff);
  }

  public read16(address: number): number {
    return this.read8(address) | (this.read8(address + 1) << 8);
  }

  public getConventionalMemoryUsage(): { usedBytes: number; freeBytes: number; totalBytes: number } {
    const totalBytes = 640 * 1024;
    return {
      usedBytes: 128 * 1024, // DOS kernel + drivers
      freeBytes: 512 * 1024,
      totalBytes
    };
  }
}

export default FreeDOSMemoryEngine;
