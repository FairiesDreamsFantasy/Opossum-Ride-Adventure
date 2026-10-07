/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AccessibilityRegistryGeneral } from "./General";
import { SystemAccessibility } from "../../Accessibility";
import { AccessibilityEngineRegistry } from "./Engine";

export * from "./General";
export * from "./Engine";

export const AccessibilityRegistry = {
  General: AccessibilityRegistryGeneral,
  SystemAccessibility: SystemAccessibility,
  ScreenReader: SystemAccessibility.ScreenReader,
  HighContrast: SystemAccessibility.HighContrast,
  KeyboardNavigation: SystemAccessibility.KeyboardNavigation,
  Engine: SystemAccessibility.Engine,
  EngineRegistry: AccessibilityEngineRegistry
};
