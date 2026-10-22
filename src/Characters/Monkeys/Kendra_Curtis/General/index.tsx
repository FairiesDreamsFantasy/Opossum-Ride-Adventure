/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KENDRA_CURTIS_COLORS } from "../Color_Palette";

export interface KendraCurtisConfig {
  id: string;
  name: string;
  maidenOrFullName: string;
  gender: "Female";
  species: "Monkey";
  troop: "Curtis";
  role: "Evangelical Cult Leader / Faction Commander";
  religion: "Evangelical (ultra-Christian)";
  heightInches: number;
  heightFeetFormatted: string;
  physicality: {
    skinColor: string;
    skinColorHex: string;
    hairColor: string;
    hairColorHex: string;
    eyeColor: string;
    eyeColorHex: string;
  };
  attire: {
    dress: string;
    underlayerHosiery: string;
    topHosiery: string;
    footwear: string;
    accessories: string[];
  };
  mountAffinity: {
    primary: string;
    secondary: string;
    ridesMooseExclusively: boolean;
  };
}

export const KENDRA_CURTIS_CONFIG: KendraCurtisConfig = {
  id: "kendra_curtis",
  name: "Kendra",
  maidenOrFullName: "Kendra Curtis",
  gender: "Female",
  species: "Monkey",
  troop: "Curtis",
  role: "Evangelical Cult Leader / Faction Commander",
  religion: "Evangelical (ultra-Christian)",
  heightInches: 82, // 6 feet 10 inches
  heightFeetFormatted: "6 feet 10 inches (6'10\")",
  physicality: {
    skinColor: "Peach (White ethnicity)",
    skinColorHex: KENDRA_CURTIS_COLORS.skinTone,
    hairColor: "Blond",
    hairColorHex: KENDRA_CURTIS_COLORS.hair,
    eyeColor: "Green",
    eyeColorHex: KENDRA_CURTIS_COLORS.eyes
  },
  attire: {
    dress: "Form-fitting White Pencil Dress",
    underlayerHosiery: "White pantyhose worn beneath gold stockings",
    topHosiery: "Shimmering Gold Stockings worn over white pantyhose",
    footwear: "Royal Purple High Heels with pronounced arches",
    accessories: [
      "Biblically compliant female attire",
      "Solid Gold Cross Pendant Necklace",
      "Birch-Bark Leather-Bound Preaching Scroll",
      "Polished Brass Brooch"
    ]
  },
  mountAffinity: {
    primary: "Giant Moose",
    secondary: "Wild Mustang",
    ridesMooseExclusively: false
  }
};
