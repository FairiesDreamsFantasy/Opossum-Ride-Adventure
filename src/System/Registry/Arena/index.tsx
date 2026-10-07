/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaveRegistry } from "./Cave";
import { INITIAL_PLACES } from "../../../Arena";

/**
 * Registry Component for Arena
 * Centralized registry mapping all handcrafted and system-recognized arenas.
 */
export const ArenaRegistry = {
  id: "arena",
  path: "src/System/Registry/Arena/index.tsx",
  category: "System Registry",
  Places: INITIAL_PLACES,
  Cave: CaveRegistry,
  timestamp: new Date().toISOString()
};
