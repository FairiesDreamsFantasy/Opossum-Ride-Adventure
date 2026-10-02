/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RiderCharacter } from "../../../types";
import { ANGELA_DESCRIPTION } from "./Description";
import { ANGELA_GENERAL_CONFIG } from "./General";
import { AngelaPOV, ANGELA_POV } from "./POV";

export const ANGELA_BLAKE: RiderCharacter = {
  id: "angela",
  name: "Angela Blake",
  skinColor: "#F5C7A9", // Peach with tan undertone
  ethnicity: "White (Rastafarian only)",
  gender: "female",
  hair: "long red hair",
  outfit: "large white dress resembling Cinderella's gown, pink apron, white onesie (not visible), gold tiara with diamond-shaped red gem",
  shoes: "flat white boots",
  height: "6 feet and 8 inches",
  heritage: "Babylon-Free, Rastafarian",
  category: "primary"
};

export { ANGELA_DESCRIPTION, ANGELA_GENERAL_CONFIG, AngelaPOV, ANGELA_POV };

export const ANGELA = ANGELA_BLAKE;
