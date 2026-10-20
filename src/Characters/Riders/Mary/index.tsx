/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RiderCharacter } from "../../../types";
import { MARY_COLORS } from "./Animations/Color_Palette";
import { MaryPOV, MARY_POV } from "./POV";

export const MARY: RiderCharacter = {
  id: "mary",
  name: "Mary",
  skinColor: MARY_COLORS.skin,
  ethnicity: "White / Caucasian",
  gender: "female",
  hair: "long white hair",
  outfit: "pink onesie with flower patterns",
  shoes: "flat silver shoes",
  height: "6 feet and 3 inches",
  heritage: "Babylon-Free, Rastafarian",
  category: "primary"
};

export { MARY_COLORS, MaryPOV, MARY_POV };
