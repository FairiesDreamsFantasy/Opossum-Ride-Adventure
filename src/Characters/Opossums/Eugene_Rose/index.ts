/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, OpossumId } from "../../../types";
import { EugeneRoseProfile } from "./profile";
import { EUGENE_ROSE_DESCRIPTION, EUGENE_ROSE_DIMENSIONS, parts } from "./Description";
import { EugeneRoseGeneral } from "./General";
import { EugeneRoseSounds, playEugeneCompactSound } from "./Sounds";

export * from "./profile";
export * from "./General";
export * from "./Description";
export * from "./Sounds";
export * from "./Animations";

export const EugeneRoseOpossum: OpossumCharacter = {
  id: OpossumId.EUGENE_ROSE,
  name: "Eugene Rose",
  width: 28,
  length: 72,
  headWidth: 26.5,
  headHeight: 28,
  shoulderHeight: EUGENE_ROSE_DIMENSIONS.shoulderHeight,
  color: "Light-Gray",
  eyeColor: "Green",
  noseColor: "Pink",
  tailColor: "Pink",
  innerEarColor: "Pink",
  gender: "Male",
  sex: "Jack",
  headOrientation: "Standard",
  description: EUGENE_ROSE_DESCRIPTION,
  playChatter: playEugeneCompactSound
};

export const EugeneRose = {
  ...EugeneRoseProfile,
  description: EUGENE_ROSE_DESCRIPTION,
  dimensions: EUGENE_ROSE_DIMENSIONS,
  general: EugeneRoseGeneral,
  parts,
  sounds: EugeneRoseSounds,
  character: EugeneRoseOpossum
};

export default EugeneRoseOpossum;
