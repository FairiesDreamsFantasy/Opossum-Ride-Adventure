/**
 * Opossum Ride Adventure - RAM Disk Subsystem General Registry & Specifications
 * License: Apache-2.0 / Scientific Memory Architecture
 */

export type RAMBlockSectorSize = 512 | 1024 | 2048 | 4096;

export interface RAMDiskSectorGeometry {
  sectorSizeBytes: RAMBlockSectorSize;
  sectorsPerCluster: number;
  totalClusters: number;
  totalSizeBytes: number;
}

export interface RAMDiskAllocationPool {
  poolId: string;
  name: string;
  allocatedBytes: number;
  usedBytes: number;
  freeBytes: number;
  blockCount: number;
  sectorSize: RAMBlockSectorSize;
  isVolatile: boolean;
  creationTimestamp: number;
}

export interface RAMDiskFileEntry {
  path: string;
  size: number;
  created: number;
  lastModified: number;
  buffer: ArrayBuffer;
  checksum: number; // CRC32 mathematical validation checksum
  mimeType: string;
}

export interface RAMDiskStats {
  allocatedMB: number;
  usedMB: number;
  freeMB: number;
  fileCount: number;
  averageAccessLatencyMs: number; // Microsecond precision (<0.01ms)
  activePools: number;
}

export const RAMDiskGeneral = {
  name: "Volatile Microsecond Memory In-RAM File System Engine",
  version: "1.0.0-scientific",
  defaultAllocationMB: 64,
  maxAllocationMB: 1024,
  defaultSectorSize: 4096 as RAMBlockSectorSize,
  expectedLatencyMs: 0.005, // 5 microseconds
  evictionPolicy: "EPHEMERAL_VOLATILE_PURGE",
  isFullyOffline: true,
  license: "Apache-2.0 / Volatile Architecture"
};
