/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ColtGrayCharacter, ColtMonkeyCharacter } from "./Colt_Gray";
import { JaredAndrewsCharacter, JaredMonkeyCharacter } from "./Jared_Andrews";
import { KendraCurtisCharacter } from "./Kendra_Curtis";
import { MonkeyGeneral } from "./General";
import { drawMonkey3D } from "./Animations";

export const MonkeyCharacterModel = {
  General: MonkeyGeneral,
  draw3D: drawMonkey3D,
  Colt: ColtGrayCharacter,
  Jared: JaredAndrewsCharacter,
  Kendra: KendraCurtisCharacter,
  Colt_Gray: ColtGrayCharacter,
  Jared_Andrews: JaredAndrewsCharacter,
  Kendra_Curtis: KendraCurtisCharacter,
};

export const MonkeyCharacters = {
  Colt_Gray: ColtGrayCharacter,
  Jared_Andrews: JaredAndrewsCharacter,
  Kendra_Curtis: KendraCurtisCharacter,
  // Backward-compatible aliases
  Colt: ColtMonkeyCharacter,
  Jared: JaredMonkeyCharacter,
};

export * from "./General";
export * from "./Description";
export * from "./Animations";
export { ColtGrayCharacter, ColtMonkeyCharacter } from "./Colt_Gray";
export { JaredAndrewsCharacter, JaredMonkeyCharacter } from "./Jared_Andrews";
export { KendraCurtisCharacter } from "./Kendra_Curtis";
