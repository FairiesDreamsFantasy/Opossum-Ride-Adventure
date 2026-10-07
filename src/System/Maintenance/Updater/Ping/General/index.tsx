/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UpdaterPingStatus {
  lastPingTime: number;
  isOnline: boolean;
  roundTripTimeMs: number;
  consecutiveFailures: number;
}

export const PingGeneralConfig = {
  name: "Updater Ping General",
  module: "System/Maintenance/Updater/Ping",
  version: "0.2.8.0",
  standard: "40,000,000,000%_ULTRA_BROAD",
  timeoutMs: 4000
};
