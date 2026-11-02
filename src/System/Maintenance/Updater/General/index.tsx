/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UpdateHandshakeResult {
  updateAvailable: boolean;
  currentVersion: string;
  serverVersion: string;
  buildTimestamp?: number;
  releaseNotes?: string;
}

export const UpdaterGeneralConfig = {
  name: "System Updater General",
  module: "System/Maintenance/Updater",
  version: "0.2.8.0",
  standard: "40,000,000,000%_ULTRA_BROAD",
  checkCadenceMs: 60000
};
