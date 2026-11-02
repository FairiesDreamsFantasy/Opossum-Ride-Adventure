/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BuildingBlocksIndex } from "../../../Building_Blocks/Index";

export const BuildingBlocksRegistryIndex = {
  id: "building_blocks_registry_index",
  name: "Building Blocks Registry Index",
  module: "System/Registry/Building_Blocks/Index",
  Index: BuildingBlocksIndex,
  list: BuildingBlocksIndex.materials,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
