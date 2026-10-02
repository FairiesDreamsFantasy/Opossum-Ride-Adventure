/**
 * Opossum Ride Adventure - Physical Local Disk Subsystem General Registry & Specifications
 * License: Apache-2.0 / PWA Physical Disk Architecture
 */

export type HostFileSystemType = "NTFS" | "FAT32" | "exFAT" | "APFS" | "ext4" | "Btrfs" | "Unknown";

export type LocalDiskStorageType = "OPFS" | "FileSystemAccess" | "IndexedDB" | "LocalStorage";

export interface LocalDiskVolumeInfo {
  volumeId: string;
  volumeName: string;
  fileSystemType: HostFileSystemType;
  storageType: LocalDiskStorageType;
  mounted: boolean;
  readOnly: boolean;
  quotaBytes: number;
  usageBytes: number;
  persistentGranted: boolean;
}

export interface PrivateBrowsingSecurityPolicy {
  isPrivateBrowsingContext: boolean;
  ephemeralSessionIsolated: boolean;
  autoPurgeOnUnload: boolean;
  zeroTraceGuarantee: boolean;
  activePurgeTriggers: string[];
}

export interface StorageQuotaStats {
  quotaMB: number;
  usageMB: number;
  availableMB: number;
  isPersistent: boolean;
}

export const LocalDiskGeneral = {
  name: "Physical Local Disk & PWA Storage Architecture Engine",
  version: "1.0.0-scientific",
  supportedFileSystems: ["NTFS", "FAT32", "exFAT", "APFS", "ext4", "Btrfs"],
  supportedStorageTypes: ["OPFS", "FileSystemAccess", "IndexedDB", "LocalStorage"],
  supportsOPFS: typeof navigator !== "undefined" && "storage" in navigator && "getDirectory" in navigator.storage,
  supportsFileSystemAccess: typeof window !== "undefined" && "showDirectoryPicker" in window,
  isFullyOffline: true,
  license: "Apache-2.0 / PWA Physical Disk Standard"
};
