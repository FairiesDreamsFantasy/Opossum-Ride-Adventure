/**
 * Opossum Ride Adventure - In-Memory RAM Disk Registry General Specifications
 * License: Apache-2.0 / Scientific Memory Architecture
 */

export interface RAMDiskRegistryProfile {
  id: string;
  name: string;
  defaultAllocationMB: number;
  maxAllocationMB: number;
  sectorSize: 512 | 1024 | 2048 | 4096;
  latencyTargetMicroseconds: number;
  evictionPolicy: "EPHEMERAL_VOLATILE_PURGE" | "LRU_CACHE_FLUSH" | "EXPLICIT_USER_PURGE";
  description: string;
  deterministic: boolean;
}

export const RAMDiskRegistryGeneral = {
  name: "Opossum Ride RAM Disk Storage Registry",
  version: "1.0.0-scientific",
  precisionStandard: "75,000,000,000%",
  technology: "Host Local System RAM Volatile Direct Buffer",
  profiles: [
    {
      id: "scratchpad",
      name: "High-Speed Ephemeral Scratchpad",
      defaultAllocationMB: 64,
      maxAllocationMB: 256,
      sectorSize: 4096,
      latencyTargetMicroseconds: 5,
      evictionPolicy: "EPHEMERAL_VOLATILE_PURGE",
      description: "Direct memory buffer for real-time temporary level state, telemetry logs, and frame snapshots.",
      deterministic: true
    },
    {
      id: "audio_cache",
      name: "Volatile PCM Audio Streaming Buffer",
      defaultAllocationMB: 32,
      maxAllocationMB: 128,
      sectorSize: 2048,
      latencyTargetMicroseconds: 2,
      evictionPolicy: "LRU_CACHE_FLUSH",
      description: "Zero-latency audio ring buffer stored entirely in local machine RAM for non-blocking sound output.",
      deterministic: true
    },
    {
      id: "asset_staging",
      name: "High-Capacity In-Memory Asset Staging",
      defaultAllocationMB: 128,
      maxAllocationMB: 1024,
      sectorSize: 4096,
      latencyTargetMicroseconds: 8,
      evictionPolicy: "EXPLICIT_USER_PURGE",
      description: "Uncompressed texture and 3D vertex mesh memory pool for instantaneous level transitions.",
      deterministic: true
    }
  ] as RAMDiskRegistryProfile[]
};
