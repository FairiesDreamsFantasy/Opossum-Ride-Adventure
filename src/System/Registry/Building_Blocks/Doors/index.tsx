/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DoorsSystem } from "../../../Building_Blocks/Doors";

export const DoorsRegistry = {
  id: "doors_registry",
  name: "Doors Building Block Registry",
  module: "System/Building_Blocks/Doors",
  system: DoorsSystem,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
