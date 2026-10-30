/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Master JavaScript Asset Entry
 */

import { SYSTEM_ASSETS_PACKAGE } from "./System/index.js";
import { CHARACTERS_ASSETS_PACKAGE } from "./Characters/index.js";

export const MASTER_JS_ASSET_PACKAGE = {
  System: SYSTEM_ASSETS_PACKAGE,
  Characters: CHARACTERS_ASSETS_PACKAGE,
  buildTimestamp: Date.now()
};

export default MASTER_JS_ASSET_PACKAGE;
