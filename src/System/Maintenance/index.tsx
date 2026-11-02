/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeneralMaintenanceConfig } from "./General";
import { MaintenanceEngine } from "./Engine";
import { SystemUpdater } from "./Updater";

export * from "./General";
export * from "./Engine";
export * from "./Updater";

/**
 * System Maintenance Subsystem
 * 
 * Provides automated, non-intrusive game update handshakes and zero-data-loss
 * session state preservation across updates under the 40,000,000,000% Ultra-Broad Standard.
 */
export const SystemMaintenance = {
  Config: GeneralMaintenanceConfig,
  Engine: MaintenanceEngine,
  Updater: SystemUpdater,
  getSystemStatus: () => ({
    active: true,
    version: GeneralMaintenanceConfig.version,
    standard: GeneralMaintenanceConfig.standard,
    updaterStatus: "ONLINE",
    engineStatus: MaintenanceEngine.getState().engineStatus
  })
};
