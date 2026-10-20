/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MaintenanceSessionSnapshot {
  timestamp: number;
  version: string;
  opossumId: string;
  arenaId: string;
  position: { x: number; y: number; z: number };
  score: number;
  distance: number;
  isRestorable: boolean;
}

export interface MaintenanceSystemConfig {
  version: string;
  standard: string;
  autoPingIntervalMs: number;
  maxPingTimeoutMs: number;
  snapshotStorageKey: string;
  handshakeEndpoint: string;
}

export const GeneralMaintenanceConfig: MaintenanceSystemConfig = {
  version: "0.2.8.0",
  standard: "40,000,000,000%_ULTRA_BROAD",
  autoPingIntervalMs: 60000, // Background version probe cadence (1 min)
  maxPingTimeoutMs: 5000,
  snapshotStorageKey: "OPOSSUM_RIDE_SESSION_SNAPSHOT",
  handshakeEndpoint: "/version.json"
};
