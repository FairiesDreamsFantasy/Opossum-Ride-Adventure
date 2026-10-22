/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { World1Registry } from "./1";
import { WorldNRegistry } from "./N";
import { WorldGeneralRegistry } from "./General";

export const WorldRegistry = {
  id: "world_registry",
  path: "src/System/Registry/World/index.tsx",
  category: "World Data",
  World1: World1Registry,
  WorldN: WorldNRegistry,
  General: WorldGeneralRegistry,
  timestamp: new Date().toISOString()
};
