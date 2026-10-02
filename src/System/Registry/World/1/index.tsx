/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Level0Registry } from "./Level_0";

/**
 * Registry Component for World 1 (Royal Queendom & Manor Grounds)
 */
export const World1Registry = {
  id: "world_1",
  path: "src/System/Registry/World/1/index.tsx",
  category: "World 1 Data",
  Level0: Level0Registry,
  timestamp: new Date().toISOString()
};

export default World1Registry;
