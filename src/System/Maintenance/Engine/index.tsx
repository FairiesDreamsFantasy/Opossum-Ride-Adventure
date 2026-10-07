/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeneralMaintenanceConfig, MaintenanceSessionSnapshot } from "../General";
import { MaintenanceEngineGeneralConfig, MaintenanceEngineState } from "./General";
import * as Languages from "./Languages";

export * from "./General";
export * from "./Languages";

/**
 * Maintenance Engine Controller
 * 
 * Manages zero-data-loss gameplay session serialization and hot-swap restoration.
 * When an update is deployed, the Maintenance Engine snapshots active coordinates,
 * score, current opossum, and arena state, and cleanly restores them post-update.
 */
export class MaintenanceEngineController {
  private static instance: MaintenanceEngineController;
  public readonly Languages = Languages;
  private state: MaintenanceEngineState = {
    isMaintenanceMode: false,
    activeSnapshot: null,
    lastSnapshotTimestamp: 0,
    engineStatus: "OPTIMAL"
  };

  private constructor() {
    this.checkAndRestorePendingSnapshot();
  }

  public static getInstance(): MaintenanceEngineController {
    if (!MaintenanceEngineController.instance) {
      MaintenanceEngineController.instance = new MaintenanceEngineController();
    }
    return MaintenanceEngineController.instance;
  }

  /**
   * Serializes current gameplay state to localStorage prior to hot-reloading an update.
   */
  public serializeActiveSession(snapshot: Omit<MaintenanceSessionSnapshot, "timestamp" | "version" | "isRestorable">): boolean {
    try {
      const fullSnapshot: MaintenanceSessionSnapshot = {
        ...snapshot,
        timestamp: Date.now(),
        version: GeneralMaintenanceConfig.version,
        isRestorable: true
      };

      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(GeneralMaintenanceConfig.snapshotStorageKey, JSON.stringify(fullSnapshot));
      }

      this.state.activeSnapshot = fullSnapshot;
      this.state.lastSnapshotTimestamp = Date.now();
      this.state.engineStatus = "SNAPSHOT_SAVED";
      return true;
    } catch (e) {
      console.warn("Session snapshot serialization warning:", e);
      return false;
    }
  }

  /**
   * Reads and restores any pending session snapshot after a version update reload.
   */
  public checkAndRestorePendingSnapshot(): MaintenanceSessionSnapshot | null {
    try {
      if (typeof window === "undefined" || !window.localStorage) return null;

      const raw = window.localStorage.getItem(GeneralMaintenanceConfig.snapshotStorageKey);
      if (!raw) return null;

      const snapshot = JSON.parse(raw) as MaintenanceSessionSnapshot;
      if (snapshot && snapshot.isRestorable) {
        // Valid for up to 10 minutes post-update
        if (Date.now() - snapshot.timestamp < 600000) {
          this.state.activeSnapshot = snapshot;
          this.state.engineStatus = "RESTORING";
          // Clear so it doesn't loop restore indefinitely
          window.localStorage.removeItem(GeneralMaintenanceConfig.snapshotStorageKey);
          return snapshot;
        }
      }
      window.localStorage.removeItem(GeneralMaintenanceConfig.snapshotStorageKey);
    } catch {
      // Ignore parse failure
    }
    return null;
  }

  public getState(): Readonly<MaintenanceEngineState> {
    return { ...this.state };
  }

  public setMaintenanceMode(active: boolean): void {
    this.state.isMaintenanceMode = active;
  }
}

export const MaintenanceEngine = MaintenanceEngineController.getInstance();
