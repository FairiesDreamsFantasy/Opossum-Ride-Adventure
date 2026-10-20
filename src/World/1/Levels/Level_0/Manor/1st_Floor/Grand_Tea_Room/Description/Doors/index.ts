/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modular Door Descriptions for Grand Tea Room (Manor 1st Floor)
 */

export interface GrandTeaRoomDoorItem {
  id: string;
  name: string;
  wall: "North" | "South" | "East" | "West";
  markerRangeFeet: [number, number];
  materials: string[];
  dimensions: {
    widthFeet: number;
    heightFeet: number;
    thicknessInches?: number;
  };
  decorations?: string[];
  destination: string;
  description: string;
}

export const GrandTeaRoomDoorsDescription: {
  eastFoyerDoor: GrandTeaRoomDoorItem;
  doorsList: GrandTeaRoomDoorItem[];
} = {
  eastFoyerDoor: {
    id: "tea_room_east_grand_red_frame_door",
    name: "Grand Red Frame Doorway with Double Silver Sliding Doors",
    wall: "East",
    markerRangeFeet: [990, 1010],
    materials: ["Red Painted Frame", "Silver Sliding Doors"],
    dimensions: {
      widthFeet: 20,
      heightFeet: 20,
      thicknessInches: 6
    },
    decorations: [
      "3.5-inch Gold Circles",
      "Silver Diamonds",
      "Five-pointed Emerald Stars"
    ],
    destination: "Floor Foyer",
    description: "Along the east wall between 990 and 1,010 feet markers, a grand 20-foot red door frame decorated with 3.5-inch gold circles, silver diamonds, and five-pointed emerald stars leads back to the Floor Foyer."
  },
  doorsList: []
};

GrandTeaRoomDoorsDescription.doorsList = [
  GrandTeaRoomDoorsDescription.eastFoyerDoor
];

export default GrandTeaRoomDoorsDescription;
