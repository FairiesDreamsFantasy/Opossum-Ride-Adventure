/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MaintenanceEngineRegistryGeneral } from "./General";
import { MaintenanceEngine } from "../../../Maintenance/Engine";

export * from "./General";

export const MaintenanceEngineRegistry = {
  General: MaintenanceEngineRegistryGeneral,
  Engine: MaintenanceEngine,
  serializeActiveSession: (snapshot: any) => MaintenanceEngine.serializeActiveSession(snapshot),
  checkAndRestorePendingSnapshot: () => MaintenanceEngine.checkAndRestorePendingSnapshot(),
  getState: () => MaintenanceEngine.getState(),
  setMaintenanceMode: (active: boolean) => MaintenanceEngine.setMaintenanceMode(active)
};
