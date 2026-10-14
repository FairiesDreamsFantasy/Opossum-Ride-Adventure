/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AccessibilityIndex } from "../../../Accessibility/Index";

export const AccessibilityRegistryIndex = {
  id: "accessibility_registry_index",
  name: "Accessibility Registry Index",
  module: "System/Registry/Accessibility/Index",
  Index: AccessibilityIndex,
  list: AccessibilityIndex.features,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
