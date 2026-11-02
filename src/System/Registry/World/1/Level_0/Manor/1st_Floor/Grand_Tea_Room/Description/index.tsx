/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GrandTeaRoomDescription } from "../../../../../../../../../World/1/Levels/Level_0/Manor/1st_Floor/Grand_Tea_Room/Description";
import { GrandTeaRoomDimensionsRegistry } from "./Dimensions";

/**
 * Grand Tea Room Description Registry
 * Links description and physical dimensions metadata for the Grand Tea Room.
 */
export const GrandTeaRoomDescriptionRegistry = {
  id: "grand_tea_room_description_registry",
  Description: GrandTeaRoomDescription,
  Dimensions: GrandTeaRoomDimensionsRegistry
};

export default GrandTeaRoomDescriptionRegistry;
