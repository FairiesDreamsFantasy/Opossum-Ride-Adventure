/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EngineIndex } from "../../../Engine/Index";

export const EngineRegistryIndex = {
  id: "engine_registry_index",
  name: "Engine Registry Index",
  module: "System/Registry/Engine/Index",
  Index: EngineIndex,
  list: EngineIndex.systems,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
