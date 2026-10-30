/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiItemsGeneral } from "../General";
import { GeminiItemsData } from "../Data";
import { GeminiItemsAnimations } from "../Animations";

export const ItemsWildcard = {
  General: GeminiItemsGeneral,
  Data: GeminiItemsData,
  Animations: GeminiItemsAnimations,
  systemName: "Gemini Items Subsystem"
};

export * from "../Data";
