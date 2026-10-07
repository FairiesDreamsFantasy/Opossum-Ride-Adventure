/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GardenFeature, GARDEN_METADATA } from "../../../Building_Blocks/Garden";

export const GardenRegistry = {
  id: "garden_registry",
  name: "Garden Building Block Registry",
  module: "System/Building_Blocks/Garden",
  component: GardenFeature,
  metadata: GARDEN_METADATA,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
