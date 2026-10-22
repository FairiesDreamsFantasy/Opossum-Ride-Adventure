/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TickItem } from "../../../../../../types";

export const ItemsGeneral = {
  getEdibleItemName: (levelId: number): string => {
    switch (levelId) {
      case 0:
      case 1:
        return "Garden Ticks";
      case 2:
        return "Cave Ticks";
      case 3:
        return "Mountain Ticks";
      default:
        return "Wild Ticks";
    }
  },
  isItemInProximity: (itemZ: number, playerZ: number, thresholdMeters: number = 2.5): boolean => {
    return Math.abs(itemZ - playerZ) <= thresholdMeters;
  }
};
