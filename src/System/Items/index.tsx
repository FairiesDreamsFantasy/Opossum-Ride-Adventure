/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ObstaclesRegistry } from "../Building_Blocks/Obstacles";
import { ObjectsRegistry } from "./Objects";

export * from "./Objects";

/**
 * Centralized Item Registry: Items
 */

export const ItemsRegistry = {
  id: "items",
  name: "Items",
  category: "Edible Treats & Obstacles",
  Obstacles: ObstaclesRegistry,
  Objects: ObjectsRegistry,
  timestamp: new Date().toISOString()
};

