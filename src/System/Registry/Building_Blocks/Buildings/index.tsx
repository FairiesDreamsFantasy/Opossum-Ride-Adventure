/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Building } from "../../../Building_Blocks/Buildings";
import { BUILDING_METADATA } from "../../../Building_Blocks/Buildings/General";

export const BuildingsRegistry = {
  id: "buildings_registry",
  name: "Buildings Building Block Registry",
  module: "System/Building_Blocks/Buildings",
  component: Building,
  metadata: BUILDING_METADATA,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
