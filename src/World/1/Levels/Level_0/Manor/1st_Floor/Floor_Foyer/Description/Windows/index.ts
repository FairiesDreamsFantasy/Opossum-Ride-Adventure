/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modular Windows Description for Floor Foyer (Manor 1st Floor)
 */

export interface FoyerWindowItem {
  id: string;
  name: string;
  location: string;
  type: string;
  dimensions?: {
    widthFeet: number;
    heightFeet: number;
  };
  glassTint: string;
  description: string;
}

export const FloorFoyerWindowsDescription = {
  id: "floor_foyer_windows_description",
  name: "Floor Foyer Windows & Glazing",
  doorWindowPanels: {
    id: "foyer_brass_door_glazing",
    name: "Upper Glass Window Panels on Double Brass Doors",
    location: "North Wall (Double Brass Sliding Doors at 990 to 1,010 ft)",
    type: "Integrated Door Upper Glazing",
    glassTint: "Sky-Cyan Translucent Glaze (rgba(186, 230, 253, 0.55))",
    description: "The upper halves of the double brass sliding doors contain sky-cyan translucent glass window panels providing a clear view outward onto the open-air wooden porch."
  },
  wallWindows: [] as FoyerWindowItem[],
  narrative: "The Floor Foyer features transparent sky-cyan upper glass window panels set within the double brass sliding doors on the north wall, while the solid stone walls maintain full celestial mural coverage without exterior window cutouts."
};

export default FloorFoyerWindowsDescription;
