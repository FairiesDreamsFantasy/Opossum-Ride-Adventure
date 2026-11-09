/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RiderCharacter } from "../../../types";
import { FEMMY_COLORS } from "./Animations/Color_Palette";
import { FemmyPOV, FEMMY_POV } from "./POV";
import { FEMMY_DESCRIPTION } from "./Description";
import { FEMMY_GENERAL } from "./General";

export const FEMMY: RiderCharacter = {
  id: "femmy",
  name: "Femmy",
  skinColor: FEMMY_COLORS.skin,
  ethnicity: "Black",
  gender: "female",
  hair: "red hair",
  outfit: "beige onesie with black horizontal stripes and rainbow circles",
  shoes: "flat yellow shoes",
  height: "3 feet and 11 inches",
  heritage: "Babylon-Free, Rastafari",
  category: "advocate"
};

export { FEMMY_COLORS, FemmyPOV, FEMMY_POV, FEMMY_DESCRIPTION, FEMMY_GENERAL };
export default FEMMY;
