/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GroundPath, ElevatedPath, GROUND_PATH_METADATA, ELEVATED_PATH_METADATA } from "../../../Building_Blocks/Paths";

export const PathsRegistry = {
  id: "paths_registry",
  name: "Paths Building Block Registry",
  module: "System/Building_Blocks/Paths",
  GroundPath,
  ElevatedPath,
  groundMetadata: GROUND_PATH_METADATA,
  elevatedMetadata: ELEVATED_PATH_METADATA,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
