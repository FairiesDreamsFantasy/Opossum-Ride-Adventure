/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LimestoneDripstoneGrottoSubArena } from "./Limestone_Dripstone_Grotto";
import { GraniteRiftCavernSubArena } from "./Granite_Rift_Cavern";
import { GlacialIceCavernSubArena } from "./Glacial_Ice_Cavern";
import { BasaltLavaTubeSubArena } from "./Basalt_Lava_Tube";
import { KarstMarbleCathedralSubArena } from "./Karst_Marble_Cathedral";
import { DarkSlateFissureSubArena } from "./Dark_Slate_Fissure";
import { SubterraneanRiverBedSubArena } from "./Subterranean_River_Bed";
import { EchoSiltHollowSubArena } from "./Echo_Silt_Hollow";

/**
 * Natural Wilderness Caves (8 Sub-Arenas)
 * Distinct from src/Arena/Cave/ which is reserved for simulated caves.
 */
export const WildernessCaveArena = {
  ...LimestoneDripstoneGrottoSubArena,
  SubArenas: {
    LimestoneDripstoneGrottoSubArena,
    GraniteRiftCavernSubArena,
    GlacialIceCavernSubArena,
    BasaltLavaTubeSubArena,
    KarstMarbleCathedralSubArena,
    DarkSlateFissureSubArena,
    SubterraneanRiverBedSubArena,
    EchoSiltHollowSubArena
  }
};

export {
  LimestoneDripstoneGrottoSubArena,
  GraniteRiftCavernSubArena,
  GlacialIceCavernSubArena,
  BasaltLavaTubeSubArena,
  KarstMarbleCathedralSubArena,
  DarkSlateFissureSubArena,
  SubterraneanRiverBedSubArena,
  EchoSiltHollowSubArena
};

export default WildernessCaveArena;
