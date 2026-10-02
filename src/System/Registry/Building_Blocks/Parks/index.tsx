/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Park, PARK_METADATA } from "../../../Building_Blocks/Parks";

export const ParksRegistry = {
  id: "parks_registry",
  name: "Parks Building Block Registry",
  module: "System/Building_Blocks/Parks",
  component: Park,
  metadata: PARK_METADATA,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
