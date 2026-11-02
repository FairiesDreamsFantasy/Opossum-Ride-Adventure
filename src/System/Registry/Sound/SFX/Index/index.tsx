/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SFXIndex } from "../../../../../System/Sound/SFX/Index";

export const SFXRegistryIndex = {
  id: "sfx_registry_index",
  name: "SFX Registry Index",
  module: "System/Registry/Sound/SFX/Index",
  Index: SFXIndex,
  list: SFXIndex.clips,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
