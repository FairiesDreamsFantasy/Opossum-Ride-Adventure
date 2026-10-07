/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FloorFoyerDescriptionRegistry } from "./Manor/1st_Floor/Floor_Foyer/Description";
import { GrandTeaRoomRegistry } from "./Manor/1st_Floor/Grand_Tea_Room";
import { Manor1stFloorRegistry } from "./Manor/1st_Floor";

export const Level0Registry = {
  id: "level_0_registry",
  name: "Level 0 Registry",
  FloorFoyerDescription: FloorFoyerDescriptionRegistry,
  GrandTeaRoom: GrandTeaRoomRegistry,
  Manor: {
    "1st_Floor": Manor1stFloorRegistry
  }
};

export default Level0Registry;
