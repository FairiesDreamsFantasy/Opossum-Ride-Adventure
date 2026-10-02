/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RenderGrandTeaRoomEastWall } from "../../../../../../../../../World/1/Levels/Level_0/Manor/1st_Floor/Grand_Tea_Room/Animations/East";
import { RenderGrandTeaRoomWestWall } from "../../../../../../../../../World/1/Levels/Level_0/Manor/1st_Floor/Grand_Tea_Room/Animations/West";
import { RenderGrandTeaRoomNorthWall } from "../../../../../../../../../World/1/Levels/Level_0/Manor/1st_Floor/Grand_Tea_Room/Animations/North";
import { RenderGrandTeaRoomSouthWall } from "../../../../../../../../../World/1/Levels/Level_0/Manor/1st_Floor/Grand_Tea_Room/Animations/South";
import { GrandTeaRoomAnimations } from "../../../../../../../../../World/1/Levels/Level_0/Manor/1st_Floor/Grand_Tea_Room/Animations";

export const GrandTeaRoomAnimationsRegistry = {
  id: "grand_tea_room_animations_registry",
  Component: GrandTeaRoomAnimations,
  East: RenderGrandTeaRoomEastWall,
  West: RenderGrandTeaRoomWestWall,
  North: RenderGrandTeaRoomNorthWall,
  South: RenderGrandTeaRoomSouthWall
};

export default GrandTeaRoomAnimationsRegistry;
