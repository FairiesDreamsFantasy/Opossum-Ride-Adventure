/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiWindowsGeneral } from "../General";
import { GeminiWindowsData } from "../Data";
import { GeminiWindowsAnimations } from "../Animations";

export const WindowsWildcard = {
  General: GeminiWindowsGeneral,
  Data: GeminiWindowsData,
  Animations: GeminiWindowsAnimations,
  systemName: "Gemini Windows Subsystem"
};

export * from "../Data";
