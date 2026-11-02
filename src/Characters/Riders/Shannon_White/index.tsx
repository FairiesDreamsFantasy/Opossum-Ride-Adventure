/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RiderCharacter } from "../../../types";
import { SHANNON_WHITE_GENERAL_CONFIG, SHANNON_GENERAL_CONFIG } from "./General";

export const SHANNON_WHITE: RiderCharacter = {
  id: "shannon_white",
  name: "Shannon White",
  skinColor: "#D2A679", // Light-brown with warm undertone
  ethnicity: "Biracial (White mother / Black father)",
  gender: "female",
  hair: "Blond",
  outfit: "Large Cinderella-style blue gown with white apron, matching onesie beneath (not visible), silver moon tiara with 3-inch white-gold gem, diamond necklace with circular silver charm",
  shoes: "White boots",
  height: "5 feet and 11.5 inches",
  heritage: "Babylon-Free, Rastafari",
  category: "primary"
};

export const SHANNON = SHANNON_WHITE;
export { SHANNON_WHITE_GENERAL_CONFIG, SHANNON_GENERAL_CONFIG };
