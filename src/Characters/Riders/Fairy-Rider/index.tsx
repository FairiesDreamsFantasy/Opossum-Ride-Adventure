/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RiderCharacter } from "../../../types";
import { FairyRiderPOV } from "./POV";
import { FairyRider2D } from "./2-D";
import { FairyRider3D } from "./3-D";
import { FairyRiderPolygons } from "./Polygons";
import { FairyRiderPixelations } from "./Pixelations";
import { FAIRY_RIDER_COLORS } from "./Color_Palette";

export const FAIRY_RIDER: RiderCharacter = {
  name: "Fairy-Rider",
  skinColor: FAIRY_RIDER_COLORS.skin,
  ethnicity: "Black person",
  gender: "male",
  hair: "black hair",
  outfit: "blue onesie",
  shoes: "black shoes",
  height: "5 feet and 4 inches",
  heritage: "Rastafarian"
};

export {
  FairyRiderPOV,
  FairyRider2D,
  FairyRider3D,
  FairyRiderPolygons,
  FairyRiderPixelations,
  FAIRY_RIDER_COLORS
};
