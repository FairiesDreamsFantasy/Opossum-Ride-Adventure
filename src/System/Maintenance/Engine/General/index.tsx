/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MaintenanceEngineState {
  isMaintenanceMode: boolean;
  activeSnapshot: unknown | null;
  lastSnapshotTimestamp: number;
  engineStatus: "OPTIMAL" | "SNAPSHOT_SAVED" | "UPDATING" | "RESTORING";
}

export const MaintenanceEngineGeneralConfig = {
  name: "Maintenance Engine General",
  module: "System/Maintenance/Engine",
  version: "0.2.8.0",
  standard: "40,000,000,000%_ULTRA_BROAD",
  autoSaveIntervalMs: 15000 // Periodic background save
};
