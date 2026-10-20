/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumsIndex } from "../../../../../../Characters/Opossums/Index";

export const CraftedOpossumsRegistryIndex = {
  id: "crafted_opossums_registry_index",
  name: "Crafted Opossums Registry Index",
  module: "System/Registry/Characters/Opossums/Crafted/Index",
  list: OpossumsIndex.list,
  count: OpossumsIndex.count,
  get: (id: string) => OpossumsIndex.getById(id),
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
