/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualsIndex } from "../../../Visuals/Index";

export const VisualsRegistryIndex = {
  id: "visuals_registry_index",
  name: "Visuals Registry Index",
  module: "System/Registry/Visuals/Index",
  Index: VisualsIndex,
  list: VisualsIndex.layers,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
