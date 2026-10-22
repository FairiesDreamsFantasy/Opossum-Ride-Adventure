/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RiderCharacter } from "../../../types";
import { SEAN_WHITE_GENERAL_CONFIG, SEAN_GENERAL_CONFIG } from "./General";

export const SEAN_WHITE: RiderCharacter = {
  id: "sean_white",
  name: "Sean White",
  skinColor: "#4B2E1E", // Rich Black skin tone
  ethnicity: "Black (Rastafari only)",
  gender: "male",
  hair: "Brown",
  outfit: "White and indigo onesie with 1.1cm thick horizontal indigo stripes, white socks, and yellow hat",
  shoes: "Orange boots",
  height: "3 feet and 3 inches",
  heritage: "Babylon-Free, Rastafari",
  category: "primary"
};

export const SEAN = SEAN_WHITE;
export { SEAN_WHITE_GENERAL_CONFIG, SEAN_GENERAL_CONFIG };
