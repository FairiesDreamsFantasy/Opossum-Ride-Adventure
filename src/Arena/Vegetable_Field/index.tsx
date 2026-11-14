/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VegetableFieldArenaGeneral } from "./General";
import { CarrotFieldSubArena } from "./Carrot_Field";
import { PotatoFieldSubArena } from "./Potato_Field";
import { TomatoFieldSubArena } from "./Tomato_Field";
import { CabbageFieldSubArena } from "./Cabbage_Field";
import { OnionFieldSubArena } from "./Onion_Field";
import { BroccoliFieldSubArena } from "./Broccoli_Field";
import { SquashFieldSubArena } from "./Squash_Field";
import { SpinachFieldSubArena } from "./Spinach_Field";
import { BellPepperFieldSubArena } from "./Bell_Pepper_Field";

export const VegetableFieldArena = {
  ...VegetableFieldArenaGeneral
};

export {
  CarrotFieldSubArena,
  PotatoFieldSubArena,
  TomatoFieldSubArena,
  CabbageFieldSubArena,
  OnionFieldSubArena,
  BroccoliFieldSubArena,
  SquashFieldSubArena,
  SpinachFieldSubArena,
  BellPepperFieldSubArena
};

export default VegetableFieldArena;
