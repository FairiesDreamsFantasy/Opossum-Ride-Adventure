/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GrandTeaRoomDimensions } from "./Dimensions";
import { GrandTeaRoomDoorsDescription } from "./Doors";
import { GrandTeaRoomWindowsDescription } from "./Windows";

export const GrandTeaRoomDescription = {
  id: "grand_tea_room_description",
  name: "Grand Tea Room",
  narrative: "You step into the Grand Tea Room of the Manor, positioned to the west of the Floor Foyer. Welcoming red and black checked tile flooring stretches across 2,000 by 2,000 feet. The walls feature a pinkish white horizon blending into a purple sky with bright green stars. Lights emit a gentle glow, and 10 by 10 feet picture windows line the north and west walls. Along the east wall, modular tapestries hang between 100 and 400 feet markers, and a grand 20-foot red door frame decorated with 3.5-inch gold circles, silver diamonds, and five-pointed emerald stars leads back to the foyer.",
  reverbProfile: "Grand Manor Sanctuary",
  acousticType: "checked_tile",
  lighting: "Gentle glow",
  walls: "Pinkish white horizon, purple sky with bright green stars",
  flooring: "Red and black checked tile flooring",
  dimensions: GrandTeaRoomDimensions,
  doors: GrandTeaRoomDoorsDescription,
  windows: GrandTeaRoomWindowsDescription
};

export { GrandTeaRoomDoorsDescription, GrandTeaRoomWindowsDescription };
export default GrandTeaRoomDescription;
