/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modular Windows Description for Grand Tea Room (Manor 1st Floor)
 */

export interface GrandTeaRoomWindowItem {
  id: string;
  name: string;
  wall: "North" | "West";
  type: string;
  dimensions: {
    widthFeet: number;
    heightFeet: number;
  };
  spacingFeet: number;
  description: string;
}

export const GrandTeaRoomWindowsDescription = {
  id: "grand_tea_room_windows_description",
  name: "Grand Tea Room Picture Windows",
  pictureWindowSpecifications: {
    dimensions: {
      widthFeet: 10,
      heightFeet: 10
    },
    walls: ["North", "West"] as Array<"North" | "West">,
    spacingFeet: 50,
    description: "10 by 10 feet picture windows line the north and west walls providing scenic natural lighting into the Grand Tea Room."
  },
  narrative: "10 by 10 feet picture windows line the north and west walls, bringing natural light across the red and black checked tile flooring."
};

export default GrandTeaRoomWindowsDescription;
