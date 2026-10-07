/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiDoorsGeneral } from "../General";
import { GeminiDoorsData } from "../Data";
import { GeminiDoorsAnimations } from "../Animations";

export const DoorsWildcard = {
  General: GeminiDoorsGeneral,
  Data: GeminiDoorsData,
  Animations: GeminiDoorsAnimations,
  systemName: "Gemini Doors Subsystem"
};

export * from "../Data";
