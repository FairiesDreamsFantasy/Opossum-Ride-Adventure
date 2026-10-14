/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flyover } from "../../../Building_Blocks/Flyover";
import { FLYOVER_DEFAULT_SPEC } from "../../../Building_Blocks/Flyover/General";

export const FlyoverRegistry = {
  id: "flyover_registry",
  name: "Flyover Building Block Registry",
  module: "System/Building_Blocks/Flyover",
  component: Flyover,
  defaultSpec: FLYOVER_DEFAULT_SPEC,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
