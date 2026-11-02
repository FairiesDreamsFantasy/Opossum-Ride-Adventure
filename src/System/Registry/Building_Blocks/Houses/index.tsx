/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { House } from "../../../Building_Blocks/Houses";
import { HOUSE_METADATA } from "../../../Building_Blocks/Houses/General";

export const HousesRegistry = {
  id: "houses_registry",
  name: "Houses Building Block Registry",
  module: "System/Building_Blocks/Houses",
  component: House,
  metadata: HOUSE_METADATA,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
