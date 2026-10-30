/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, OpossumId } from "../../../types";
import { MelvinQinProfile } from "./profile";
import { MELVIN_QIN_DESCRIPTION, MELVIN_QIN_DIMENSIONS, parts } from "./Description";
import { MelvinQinGeneral } from "./General";
import { MelvinQinSounds, playMelvinQinBark } from "./Sounds";

export * from "./profile";
export * from "./General";
export * from "./Description";
export * from "./Sounds";
export * from "./Animations";

export const MelvinQinOpossum: OpossumCharacter = {
  id: OpossumId.MELVIN_QIN,
  name: "Melvin Qin",
  width: 34,
  length: 68,
  headWidth: 32,
  headHeight: 30,
  shoulderHeight: "3.5 feet",
  color: "Light-tan",
  eyeColor: "Dark-Green",
  noseColor: "Brown",
  tailColor: "Brown",
  innerEarColor: "Brown",
  gender: "Male",
  sex: "Jack",
  headOrientation: "perched forward with inquisitive focus in standard natural orientation",
  description: MELVIN_QIN_DESCRIPTION,
  playChatter: playMelvinQinBark
};

export const MelvinQin = {
  ...MelvinQinProfile,
  description: MELVIN_QIN_DESCRIPTION,
  dimensions: MELVIN_QIN_DIMENSIONS,
  general: MelvinQinGeneral,
  parts,
  sounds: MelvinQinSounds,
  character: MelvinQinOpossum
};

export default MelvinQinOpossum;
