/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RidersIndex } from "../../../../../Characters/Riders/Index";

export const RidersRegistryIndex = {
  id: "riders_registry_index",
  name: "Riders Registry Index",
  module: "System/Registry/Characters/Riders/Index",
  Index: RidersIndex,
  list: RidersIndex.list,
  get: (id: string) => RidersIndex.getById(id),
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
