/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Railway } from "../../../Building_Blocks/Railway";
import { RAILWAY_TRACK_METADATA } from "../../../Building_Blocks/Railway/General";

export const RailwayRegistry = {
  id: "railway_registry",
  name: "Railway Building Block Registry",
  module: "System/Building_Blocks/Railway",
  component: Railway,
  metadata: RAILWAY_TRACK_METADATA,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
