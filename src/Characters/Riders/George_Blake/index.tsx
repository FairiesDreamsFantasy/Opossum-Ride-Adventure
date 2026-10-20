/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RiderCharacter } from "../../../types";
import { GEORGE_DESCRIPTION } from "./Description";
import { GEORGE_GENERAL_CONFIG } from "./General";
import { GeorgePOV, GEORGE_POV } from "./POV";

export const GEORGE_BLAKE: RiderCharacter = {
  id: "george",
  name: "George Blake",
  skinColor: "#C68A4C", // Light brown with honey undertone
  ethnicity: "Black/African-American (Rastafari only)",
  gender: "male",
  hair: "short black dreadlocks",
  outfit: "gold onesie with yellow honeycomb pattern (2.5in hexagons, 0.005in black borders) and red crown",
  shoes: "green shoes resembling vegetation",
  height: "4 feet and 4 inches",
  heritage: "Babylon-Free, Rastafari",
  category: "primary"
};

export { GEORGE_DESCRIPTION, GEORGE_GENERAL_CONFIG, GeorgePOV, GEORGE_POV };

export const GEORGE = GEORGE_BLAKE;
