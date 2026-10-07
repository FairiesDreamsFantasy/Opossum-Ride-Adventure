/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MaintenanceIndex } from "../../../Maintenance/Index";

export const MaintenanceRegistryIndex = {
  id: "maintenance_registry_index",
  name: "Maintenance Registry Index",
  module: "System/Registry/Maintenance/Index",
  Index: MaintenanceIndex,
  list: MaintenanceIndex.pipelines,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
