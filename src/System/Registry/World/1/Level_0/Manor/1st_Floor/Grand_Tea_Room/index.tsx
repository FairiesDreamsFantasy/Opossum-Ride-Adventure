/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GrandTeaRoomDescriptionRegistry } from "./Description";
import { GrandTeaRoomAnimationsRegistry } from "./Animations";
import { GrandTeaRoomGeneralRegistry } from "./General";

export const GrandTeaRoomRegistry = {
  id: "grand_tea_room",
  name: "Grand Tea Room",
  Description: GrandTeaRoomDescriptionRegistry,
  Animations: GrandTeaRoomAnimationsRegistry,
  General: GrandTeaRoomGeneralRegistry
};

export default GrandTeaRoomRegistry;
