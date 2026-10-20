/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MaintenanceRegistryGeneral } from "./General";
import { SystemMaintenance } from "../../Maintenance";
import { MaintenanceEngineRegistry } from "./Engine";

export * from "./General";
export * from "./Engine";

export const MaintenanceRegistry = {
  General: MaintenanceRegistryGeneral,
  SystemMaintenance: SystemMaintenance,
  Engine: SystemMaintenance.Engine,
  EngineRegistry: MaintenanceEngineRegistry,
  Updater: SystemMaintenance.Updater,
  Handshake: SystemMaintenance.Updater.Handshake,
  Ping: SystemMaintenance.Updater.Ping,
  Validator: SystemMaintenance.Updater.Validator
};
