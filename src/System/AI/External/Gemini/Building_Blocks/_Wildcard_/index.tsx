/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiBuildingBlocksGeneral } from "../General";
import { GeminiBuildingBlocksData } from "../Data";
import { GeminiBuildingBlocksAnimations } from "../Animations";

export const BuildingBlocksWildcard = {
  General: GeminiBuildingBlocksGeneral,
  Data: GeminiBuildingBlocksData,
  Animations: GeminiBuildingBlocksAnimations,
  systemName: "Gemini AI Building Blocks Integration Engine"
};

export * from "../Data";
