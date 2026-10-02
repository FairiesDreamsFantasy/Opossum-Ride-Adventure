/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiWallsAndBarriersGeneral } from "../General";
import { GeminiWallsAndBarriersData } from "../Data";
import { GeminiWallsAndBarriersAnimations } from "../Animations";

export const WallsAndBarriersWildcard = {
  General: GeminiWallsAndBarriersGeneral,
  Data: GeminiWallsAndBarriersData,
  Animations: GeminiWallsAndBarriersAnimations,
  systemName: "Gemini WallsAndBarriers Subsystem"
};

export * from "../Data";
