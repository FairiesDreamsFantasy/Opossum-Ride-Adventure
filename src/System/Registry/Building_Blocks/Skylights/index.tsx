/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkylightsSystem } from "../../../Building_Blocks/Skylights";

export const SkylightsRegistry = {
  id: "skylights_registry",
  name: "Skylights Building Block Registry",
  module: "System/Building_Blocks/Skylights",
  system: SkylightsSystem,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
