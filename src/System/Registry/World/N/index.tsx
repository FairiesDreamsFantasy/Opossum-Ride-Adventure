/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelNRegistry } from "./Level_N";
import { WorldNGeneralRegistry } from "./General";

/**
 * Registry Component for World N (Delimiter Algorithm & Procedural Fallbacks)
 */
export const WorldNRegistry = {
  id: "world_n",
  path: "src/System/Registry/World/N/index.tsx",
  category: "World N Delimiter & Fallback Data",
  LevelN: LevelNRegistry,
  General: WorldNGeneralRegistry,
  timestamp: "2026-08-29T08:58:00.000Z"
};

