/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, OpossumId } from "../../../types";
import { IvanOpossumProfile } from "./profile";
import { IVAN_OPOSSUM_DESCRIPTION, IVAN_OPOSSUM_DIMENSIONS, parts } from "./Description";
import { IvanOpossumGeneral } from "./General";
import { IvanOpossumSounds, playIvanOpossumBark } from "./Sounds";

export * from "./profile";
export * from "./General";
export * from "./Description";
export * from "./Sounds";
export * from "./Animations";

export const IvanOpossum: OpossumCharacter = {
  id: OpossumId.IVAN_OPOSSUM,
  name: "Ivan Opossum",
  width: 28,
  length: 60,
  headWidth: 26,
  headHeight: 25,
  shoulderHeight: "3 feet and 2.5 inches",
  color: "Pink (48 Brown Stripes)",
  eyeColor: "Brown",
  noseColor: "Red",
  tailColor: "Red",
  innerEarColor: "Dark-brown",
  gender: "Male",
  sex: "Jack",
  headOrientation: "Standard for real opossums",
  description: IVAN_OPOSSUM_DESCRIPTION,
  playChatter: playIvanOpossumBark
};

export const Ivan = {
  ...IvanOpossumProfile,
  description: IVAN_OPOSSUM_DESCRIPTION,
  dimensions: IVAN_OPOSSUM_DIMENSIONS,
  general: IvanOpossumGeneral,
  parts,
  sounds: IvanOpossumSounds,
  character: IvanOpossum
};

export default IvanOpossum;
