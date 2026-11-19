/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
export * from "./Doors";

import { BuildingBlocksGeneral } from "./General";
import { FlowersStarsDiamondsRainbowStoneDoorAI } from "./Doors";

export const BuildingBlocksAI = {
  General: BuildingBlocksGeneral,
  Doors: {
    FlowersStarsDiamondsRainbowStoneDoorAI
  }
};
