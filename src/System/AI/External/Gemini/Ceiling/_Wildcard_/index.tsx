/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiCeilingGeneral } from "../General";
import { GeminiCeilingData } from "../Data";
import { GeminiCeilingAnimations } from "../Animations";

export const CeilingWildcard = {
  General: GeminiCeilingGeneral,
  Data: GeminiCeilingData,
  Animations: GeminiCeilingAnimations,
  systemName: "Gemini Ceiling Subsystem"
};

export * from "../Data";
