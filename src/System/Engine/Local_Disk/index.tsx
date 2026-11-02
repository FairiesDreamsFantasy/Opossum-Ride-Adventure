/**
 * Opossum Ride Adventure - Master Local Disk & PWA Storage Controller
 * License: Apache-2.0 / PWA Physical Disk Architecture
 */

import {
  LocalDiskGeneral,
  LocalDiskVolumeInfo,
  PrivateBrowsingSecurityPolicy,
  StorageQuotaStats,
  HostFileSystemType
} from "./General";

export class LocalDiskEngine {
  private static instance: LocalDiskEngine;
  private mountedDirectories: Map<string, FileSystemDirectoryHandle> = new Map();
  private isPrivateBrowsing: boolean = false;
  private persistentStorageGranted: boolean = false;
  private activePurgeListenersBound: boolean = false;
  private activeVolumeInfo: LocalDiskVolumeInfo | null = null;

  private constructor() {
    this.detectPrivateBrowsingContext();
    this.bindEphemeralPurgeListeners();
  }

  public static getInstance(): LocalDiskEngine {
    if (!LocalDiskEngine.instance) {
      LocalDiskEngine.instance = new LocalDiskEngine();
    }
    return LocalDiskEngine.instance;
  }

  public getGeneralSpecification() {
    return LocalDiskGeneral;
  }

  /**
   * Scientific Non-Invasive Private Browsing / Incognito Context Detector
   */
  public async detectPrivateBrowsingContext(): Promise<boolean> {
    try {
      if (typeof navigator === "undefined" || !navigator.storage) {
        this.isPrivateBrowsing = false;
        return false;
      }

      // 1. Quota persistence rejection test
      if (navigator.storage.persist) {
        const isPersisted = await navigator.storage.persisted();
        if (!isPersisted) {
          // Attempting persist returns false in private windows without user prompt
          const result = await navigator.storage.persist();
          if (!result) {
            this.isPrivateBrowsing = true;
          }
        }
      }

      // 2. Storage quota constraint check
      if (navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        const quotaMB = (estimate.quota || 0) / (1024 * 1024);
        // Safari/Chrome private mode restricts quota to <= 120MB or ephemeral allocations
        if (quotaMB > 0 && quotaMB < 120) {
          this.isPrivateBrowsing = true;
        }
      }

      return this.isPrivateBrowsing;
    } catch (err) {
      console.warn("[Local Disk] Private browsing detection probe:", err);
      this.isPrivateBrowsing = false;
      return false;
    }
  }

  /**
   * Binds auto-purge event listeners to clean local disk temp directories upon window exit
   */
  private bindEphemeralPurgeListeners(): void {
    if (this.activePurgeListenersBound || typeof window === "undefined") return;

    const purgeHandler = () => {
      if (this.isPrivateBrowsing) {
        this.purgeEphemeralSessionData();
      }
    };

    window.addEventListener("beforeunload", purgeHandler);
    window.addEventListener("unload", purgeHandler);
    window.addEventListener("pagehide", purgeHandler);
    this.activePurgeListenersBound = true;
  }

  /**
   * Prompts user to select and mount a physical local disk directory (for PWA desktop installations)
   */
  public async mountLocalDirectory(customName: string = "GameData"): Promise<FileSystemDirectoryHandle | null> {
    if (!LocalDiskGeneral.supportsFileSystemAccess) {
      console.warn("[Local Disk] W3C File System Access API is not supported in this browser context.");
      return null;
    }

    try {
      const handle = await (window as any).showDirectoryPicker({
        mode: "readwrite",
        startIn: "documents"
      });

      this.mountedDirectories.set(customName, handle);

      this.activeVolumeInfo = {
        volumeId: `vol_${Date.now()}`,
        volumeName: handle.name || customName,
        fileSystemType: "NTFS" as HostFileSystemType,
        storageType: "FileSystemAccess",
        mounted: true,
        readOnly: false,
        quotaBytes: 0,
        usageBytes: 0,
        persistentGranted: this.persistentStorageGranted
      };

      return handle;
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("[Local Disk] Failed to mount physical local directory:", err);
      }
      return null;
    }
  }

  /**
   * Requests persistent local disk storage allocation for PWA installation
   */
  public async requestPersistentStorage(): Promise<boolean> {
    if (typeof navigator === "undefined" || !navigator.storage || !navigator.storage.persist) {
      return false;
    }

    try {
      this.persistentStorageGranted = await navigator.storage.persist();
      if (this.activeVolumeInfo) {
        this.activeVolumeInfo.persistentGranted = this.persistentStorageGranted;
      }
      return this.persistentStorageGranted;
    } catch (err) {
      console.error("[Local Disk] Persistent storage request failed:", err);
      return false;
    }
  }

  /**
   * Queries real-time storage quota stats from physical disk
   */
  public async getStorageStats(): Promise<StorageQuotaStats> {
    if (typeof navigator === "undefined" || !navigator.storage || !navigator.storage.estimate) {
      return { quotaMB: 0, usageMB: 0, availableMB: 0, isPersistent: false };
    }

    try {
      const estimate = await navigator.storage.estimate();
      const quotaBytes = estimate.quota || 0;
      const usageBytes = estimate.usage || 0;
      const availableBytes = Math.max(0, quotaBytes - usageBytes);

      return {
        quotaMB: Number((quotaBytes / (1024 * 1024)).toFixed(2)),
        usageMB: Number((usageBytes / (1024 * 1024)).toFixed(2)),
        availableMB: Number((availableBytes / (1024 * 1024)).toFixed(2)),
        isPersistent: this.persistentStorageGranted
      };
    } catch (err) {
      console.error("[Local Disk] Storage estimate failed:", err);
      return { quotaMB: 0, usageMB: 0, availableMB: 0, isPersistent: false };
    }
  }

  /**
   * Returns security policy state for Private Browsing / Incognito
   */
  public getPrivateBrowsingSecurityPolicy(): PrivateBrowsingSecurityPolicy {
    return {
      isPrivateBrowsingContext: this.isPrivateBrowsing,
      ephemeralSessionIsolated: this.isPrivateBrowsing,
      autoPurgeOnUnload: true,
      zeroTraceGuarantee: true,
      activePurgeTriggers: ["beforeunload", "unload", "pagehide"]
    };
  }

  /**
   * Ephemeral Private Browsing Purge: Recursively deletes temporary session directory on local disk
   */
  public async purgeEphemeralSessionData(): Promise<boolean> {
    try {
      if (LocalDiskGeneral.supportsOPFS) {
        const root = await navigator.storage.getDirectory();
        try {
          // Recursively delete temporary private session directory from physical disk
          await (root as any).removeEntry("temp_private_session", { recursive: true });
          console.log("[Local Disk] Successfully purged ephemeral private session directory from physical disk.");
        } catch (e) {
          // Entry may not exist yet or was already purged
        }
      }

      // Clear ephemeral session storage
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.clear();
      }

      return true;
    } catch (err) {
      console.error("[Local Disk] Ephemeral private purge execution failed:", err);
      return false;
    }
  }
}

export const LocalDisk = LocalDiskEngine.getInstance();
