/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FloorFoyerDescriptionRegistry } from "./Floor_Foyer/Description";
import { GrandTeaRoomRegistry } from "./Grand_Tea_Room";

export const Manor1stFloorRegistry = {
  id: "manor_1st_floor",
  name: "Manor 1st Floor",
  Floor_Foyer: {
    Description: FloorFoyerDescriptionRegistry
  },
  Grand_Tea_Room: GrandTeaRoomRegistry
};

export default Manor1stFloorRegistry;
