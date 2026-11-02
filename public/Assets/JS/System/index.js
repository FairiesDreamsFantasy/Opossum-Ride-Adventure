/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - System Asset Entry Point
 */

import { SYSTEM_REGISTRY_ASSET_METADATA } from "./Registry/index.js";
import { SOUND_ASSET_METADATA } from "./Sound/index.js";
import { AI_ASSET_METADATA } from "./AI/index.js";
import { ENGINE_ASSET_METADATA } from "./Engine/index.js";

export const SYSTEM_ASSETS_PACKAGE = {
  Registry: SYSTEM_REGISTRY_ASSET_METADATA,
  Sound: SOUND_ASSET_METADATA,
  AI: AI_ASSET_METADATA,
  Engine: ENGINE_ASSET_METADATA
};

export default SYSTEM_ASSETS_PACKAGE;
