/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FloorFoyerDoorsDescription } from "./Doors";
import { FloorFoyerWindowsDescription } from "./Windows";

export const FloorFoyerDescription = {
  id: "floor_foyer_description",
  name: "Floor Foyer",
  narrative: "You stand in the grand 2,000 by 2,000-foot Floor Foyer of the Manor. The completed high 30-foot ceiling echoes every footstep across the orange and purple ceramic tile floor. The walls feature atmospheric visual art with an indigo sky adorned by 24 bright yellow stars, framed above a distinct horizontal green horizon line, lined with dark forest shadow tree silhouettes over slate stone walls. Along the north wall at the 990 to 1,010-foot center markers, double brass sliding doors with glass window panels lead out to the expansive 2,000-foot wide wooden front porch. The west wall features a grand 20-foot red door frame decorated with 3.5-inch gold circles, silver diamonds, and five-pointed emerald stars opening into the Grand Tea Room, while solid perimeter walls enclose the south and east boundaries.",
  reverbProfile: "Manor Grand Vault Hall",
  extendedNarrative: "The Floor Foyer serves as the central sanctuary of the Manor. Featuring a 2,000 foot perimeter boundary, ceramic tile footstep acoustics, and safe learning environment without wild moose obstacles.",
  acousticType: "tile",
  walls: "Indigo sky with 24 yellow stars, emerald green horizon line with forest shadow tree silhouettes, and slate stone lower walls",
  flooring: "Orange and purple ceramic tile flooring",
  ceiling: {
    status: "completed",
    heightFeet: 30,
    hasDome: false,
    acoustics: "Manor Grand Vault Hall"
  },
  dimensions: {
    widthFeet: 2000,
    lengthFeet: 2000,
    ceilingHeightFeet: 30
  },
  doors: FloorFoyerDoorsDescription,
  windows: FloorFoyerWindowsDescription
};

export { FloorFoyerDoorsDescription, FloorFoyerWindowsDescription };
export default FloorFoyerDescription;
