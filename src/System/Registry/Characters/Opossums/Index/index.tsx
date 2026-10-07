/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumsIndex } from "../../../../../Characters/Opossums/Index";

export const OpossumsRegistryIndex = {
  id: "opossums_registry_index",
  name: "Opossums Registry Index",
  module: "System/Registry/Characters/Opossums/Index",
  Index: OpossumsIndex,
  list: OpossumsIndex.list,
  get: (id: string) => OpossumsIndex.getById(id),
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
