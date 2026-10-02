/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Road } from "../../../Building_Blocks/Road";
import { ROAD_DEFAULT_SPEC } from "../../../Building_Blocks/Road/General";

export const RoadRegistry = {
  id: "road_registry",
  name: "Road Building Block Registry",
  module: "System/Building_Blocks/Road",
  component: Road,
  defaultSpec: ROAD_DEFAULT_SPEC,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
