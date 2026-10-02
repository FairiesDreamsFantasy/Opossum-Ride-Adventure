/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GrandFairyTemple } from "./Grand_Fairy_Temple";
import { RainbowPassage } from "./Rainbow_Passage";
import { SacredSanctuary } from "./Sacred_Sanctuary";
import { GoldenChamber } from "./Golden_Chamber";
import { JadeGallery } from "./Jade_Gallery";
import { SilentShrine } from "./Silent_Shrine";

export const TempleArena = {
  id: "temple",
  name: "The Ancient Relic Temple",
  displayName: "The Ancient Relic Temple",
  description: "An indoor stone sanctuary designed for royal relics, echoing with standard small room brightness.",
  surfaceType: "polished slate tiles",
  footstepSound: "brite metal clinks",
  colorBase: "#581c87",
  ambientNoise: "ambient silent chamber breeze",
  lightingLevel: 0.75,
  skyColor: "#3b0764",
  horizonColor: "#581c87",
  frameColor: "#7e22ce",
  groundColor: "#2e1065",
  fireflyColor: "#d8b4fe",
  hasBGM: false, // Ambience Only
  SubArenas: {
    GrandFairyTemple,
    RainbowPassage,
    SacredSanctuary,
    GoldenChamber,
    JadeGallery,
    SilentShrine
  }
};

export {
  GrandFairyTemple,
  RainbowPassage,
  SacredSanctuary,
  GoldenChamber,
  JadeGallery,
  SilentShrine
};

export default TempleArena;
