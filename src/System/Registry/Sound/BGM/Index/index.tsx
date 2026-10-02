/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BGMIndex } from "../../../../../System/Sound/BGM/Index";

export const BGMRegistryIndex = {
  id: "bgm_registry_index",
  name: "BGM Registry Index",
  module: "System/Registry/Sound/BGM/Index",
  Index: BGMIndex,
  list: BGMIndex.tracks,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
