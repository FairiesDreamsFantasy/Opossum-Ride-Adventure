/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, OpossumId } from "../../../types";
import { IsaacOpossumProfile } from "./profile";
import { ISAAC_OPOSSUM_DESCRIPTION, ISAAC_OPOSSUM_DIMENSIONS, parts } from "./Description";
import { IsaacOpossumGeneral } from "./General";
import { IsaacOpossumSounds, playIsaacOpossumBark } from "./Sounds";

export * from "./profile";
export * from "./General";
export * from "./Description";
export * from "./Sounds";
export * from "./Animations";

export const IsaacOpossum: OpossumCharacter = {
  id: OpossumId.ISAAC_OPOSSUM,
  name: "Isaac Opossum",
  width: 27.5,
  length: 58,
  headWidth: 25.5,
  headHeight: 24.5,
  shoulderHeight: "3 feet and 1.5 inches",
  color: "Light-Gray (8 Dark-Brown Stripes)",
  eyeColor: "Dark-brown",
  noseColor: "Pinkish-red",
  tailColor: "Natural Pink",
  innerEarColor: "Natural Pink",
  gender: "Male",
  sex: "Jack",
  headOrientation: "Standard as real opossums",
  description: ISAAC_OPOSSUM_DESCRIPTION,
  playChatter: playIsaacOpossumBark
};

export const Isaac = {
  ...IsaacOpossumProfile,
  description: ISAAC_OPOSSUM_DESCRIPTION,
  dimensions: ISAAC_OPOSSUM_DIMENSIONS,
  general: IsaacOpossumGeneral,
  parts,
  sounds: IsaacOpossumSounds,
  character: IsaacOpossum
};

export default IsaacOpossum;
