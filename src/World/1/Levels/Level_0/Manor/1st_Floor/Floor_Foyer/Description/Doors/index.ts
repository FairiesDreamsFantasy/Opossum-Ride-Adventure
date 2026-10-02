/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modular Door Descriptions for Floor Foyer (Manor 1st Floor)
 */

export interface FoyerDoorItem {
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

export const FloorFoyerDoorsDescription: {
  northBrassDoors: FoyerDoorItem;
  westRedFrameDoor: FoyerDoorItem;
  doorsList: FoyerDoorItem[];
} = {
  northBrassDoors: {
    id: "foyer_north_brass_sliding_doors",
    name: "Double Brass Sliding Doors (Rastafarian Opossums In the Royal Queendom)",
    wall: "North",
    markerRangeFeet: [990, 1010],
    materials: ["Polished Brass", "Upper Glass Window Panels"],
    dimensions: {
      widthFeet: 20,
      heightFeet: 20
    },
    destination: "Expanded Front Porch (2,000 ft wide wooden decking)",
    description: "Along the north wall at the 990 to 1,010-foot center markers, double brass sliding doors with glass window panels lead out to the expansive 2,000-foot wide wooden front porch."
  },
  westRedFrameDoor: {
    id: "foyer_west_grand_red_frame_door",
    name: "Grand Red Frame Doorway with Double Silver Sliding Doors",
    wall: "West",
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
    destination: "Grand Tea Room",
    description: "The west wall features a grand 20-foot red door frame decorated with 3.5-inch gold circles, silver diamonds, and five-pointed emerald stars opening into the Grand Tea Room."
  },
  doorsList: []
};

FloorFoyerDoorsDescription.doorsList = [
  FloorFoyerDoorsDescription.northBrassDoors,
  FloorFoyerDoorsDescription.westRedFrameDoor
];

export default FloorFoyerDoorsDescription;
