/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeneralAccessibilityConfig } from "./General";
import { ScreenReader } from "./ScreenReader";
import { HighContrast } from "./HighContrast";
import { KeyboardNavigation } from "./KeyboardNavigation";
import { AccessibilityEngine } from "./Engine";

export * from "./General";
export * from "./ScreenReader";
export * from "./HighContrast";
export * from "./KeyboardNavigation";
export * from "./Engine";

/**
 * System Accessibility Subsystem Coordinator
 * 
 * Unifies Screen Reader controls (with global Ctrl speech cancellation and non-disruptive grid/ad rules),
 * High Contrast visual engines, and Keyboard Navigation under the 40,000,000,000% Standard.
 */
export const SystemAccessibility = {
  Config: GeneralAccessibilityConfig,
  ScreenReader: ScreenReader,
  HighContrast: HighContrast,
  KeyboardNavigation: KeyboardNavigation,
  Engine: AccessibilityEngine,
  cancelSpeech: () => ScreenReader.cancelActiveSpeech(),
  announce: (text: string, context?: "OPOSSUM_SELECTION" | "INTERSTITIAL_AD" | "GAMEPLAY_STATUS" | "USER_COMMAND") =>
    ScreenReader.announceText(text, context)
};
