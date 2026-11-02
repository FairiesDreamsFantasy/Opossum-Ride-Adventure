/**
 * Opossum Ride Adventure - Master In-Memory RAM Disk Subsystem Controller
 * License: Apache-2.0 / Scientific Memory Architecture
 */

import {
  RAMDiskGeneral,
  RAMDiskAllocationPool,
  RAMDiskFileEntry,
  RAMDiskStats,
  RAMBlockSectorSize
} from "./General";

/**
 * Mathematical CRC32 Checksum Calculator for Memory Integrity
 */
function calculateCRC32(buffer: ArrayBuffer): number {
  const bytes = new Uint8Array(buffer);
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    crc = crc ^ byte;
    for (let j = 0; j < 8; j++) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export class RAMDiskEngine {
  private static instance: RAMDiskEngine;
  private memoryPools: Map<string, RAMDiskAllocationPool> = new Map();
  private fileSystem: Map<string, RAMDiskFileEntry> = new Map();
  private allocatedRawBuffer: ArrayBuffer | null = null;
  private rawUint8View: Uint8Array | null = null;
  private maxCapacityBytes: number = 64 * 1024 * 1024; // Default 64 MB
  private usedBytes: number = 0;

  private constructor() {
    this.initializePool("default_scratchpad", 64, 4096);
  }

  public static getInstance(): RAMDiskEngine {
    if (!RAMDiskEngine.instance) {
      RAMDiskEngine.instance = new RAMDiskEngine();
    }
    return RAMDiskEngine.instance;
  }

  public getGeneralSpecification() {
    return RAMDiskGeneral;
  }

  /**
   * Initializes or expands an allocated in-memory RAM pool
   */
  public initializePool(poolId: string, sizeMB: number, sectorSize: RAMBlockSectorSize = 4096): boolean {
    try {
      const requestedBytes = Math.min(sizeMB, RAMDiskGeneral.maxAllocationMB) * 1024 * 1024;
      this.allocatedRawBuffer = new ArrayBuffer(requestedBytes);
      this.rawUint8View = new Uint8Array(this.allocatedRawBuffer);
      this.maxCapacityBytes = requestedBytes;
      this.usedBytes = 0;
      const pool: RAMDiskAllocationPool = {
        poolId,
        name: `Volatile RAM Pool (${sizeMB} MB)`,
        allocatedBytes: requestedBytes,
        usedBytes: 0,
        freeBytes: requestedBytes,
        blockCount: Math.floor(requestedBytes / sectorSize),
        sectorSize,
        isVolatile: true,
        creationTimestamp: Date.now()
      };
      this.memoryPools.set(poolId, pool);
      return true;
    } catch (err) {
      console.error("[RAM Disk] Failed to allocate dynamic memory pool:", err);
      return false;
    }
  }

  /**
   * Writes a file directly into volatile RAM memory with CRC32 verification
   */
  public writeFile(path: string, content: ArrayBuffer | string, mimeType: string = "application/octet-stream"): boolean {
    const buffer = typeof content === "string" ? (new TextEncoder().encode(content).buffer as ArrayBuffer) : (content as ArrayBuffer);
    const size = buffer.byteLength;
    if (this.usedBytes + size > this.maxCapacityBytes) {
      console.warn(`[RAM Disk] Storage quota exceeded. Requested: ${size} bytes, Free: ${this.maxCapacityBytes - this.usedBytes} bytes.`);
      return false;
    }
    const checksum = calculateCRC32(buffer);
    const fileEntry: RAMDiskFileEntry = {
      path,
      size,
      created: Date.now(),
      lastModified: Date.now(),
      buffer,
      checksum,
      mimeType
    };
    const previousEntry = this.fileSystem.get(path);
    if (previousEntry) {
      this.usedBytes -= previousEntry.size;
    }
    this.fileSystem.set(path, fileEntry);
    this.usedBytes += size;
    // Update default pool stats
    const defaultPool = this.memoryPools.get("default_scratchpad");
    if (defaultPool) {
      defaultPool.usedBytes = this.usedBytes;
      defaultPool.freeBytes = defaultPool.allocatedBytes - this.usedBytes;
    }
    return true;
  }

  /**
   * Reads a file from volatile RAM memory with microsecond latency
   */
  public readFile(path: string): RAMDiskFileEntry | null {
    const file = this.fileSystem.get(path);
    if (!file) return null;
    // Verify mathematical integrity using CRC32
    const currentCRC = calculateCRC32(file.buffer as ArrayBuffer);
    if (currentCRC !== file.checksum) {
      console.error(`[RAM Disk] Memory corruption detected for file ${path}. Checksum mismatch!`);
      return null;
    }
    return file;
  }

  /**
   * Reads file as UTF-8 string
   */
  public readTextFile(path: string): string | null {
    const file = this.readFile(path);
    if (!file) return null;
    return new TextDecoder().decode(file.buffer as ArrayBuffer);
  }

  /**
   * Deletes a file from the RAM file system
   */
  public deleteFile(path: string): boolean {
    const file = this.fileSystem.get(path);
    if (!file) return false;
    this.usedBytes -= file.size;
    this.fileSystem.delete(path);
    const defaultPool = this.memoryPools.get("default_scratchpad");
    if (defaultPool) {
      defaultPool.usedBytes = this.usedBytes;
      defaultPool.freeBytes = defaultPool.allocatedBytes - this.usedBytes;
    }
    return true;
  }

  /**
   * Returns current live statistics of the RAM Disk
   */
  public getStats(): RAMDiskStats {
    return {
      allocatedMB: Number((this.maxCapacityBytes / (1024 * 1024)).toFixed(2)),
      usedMB: Number((this.usedBytes / (1024 * 1024)).toFixed(2)),
      freeMB: Number(((this.maxCapacityBytes - this.usedBytes) / (1024 * 1024)).toFixed(2)),
      fileCount: this.fileSystem.size,
      averageAccessLatencyMs: RAMDiskGeneral.expectedLatencyMs,
      activePools: this.memoryPools.size
    };
  }

  /**
   * Completely purges all allocated RAM memory and returns buffers to browser GC
   */
  public purgeRAMDisk(): void {
    this.fileSystem.clear();
    this.allocatedRawBuffer = null;
    this.rawUint8View = null;
    this.usedBytes = 0;
    this.memoryPools.clear();
    this.initializePool("default_scratchpad", 64, 4096);
  }
}

export const RAMDisk = RAMDiskEngine.getInstance();
