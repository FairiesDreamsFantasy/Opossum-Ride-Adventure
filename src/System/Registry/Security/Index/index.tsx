/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SecurityIndex } from "../../../Security/Index";

export const SecurityRegistryIndex = {
  id: "security_registry_index",
  name: "Security Registry Index",
  module: "System/Registry/Security/Index",
  Index: SecurityIndex,
  list: SecurityIndex.defenses,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
