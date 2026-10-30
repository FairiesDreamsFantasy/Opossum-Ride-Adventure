/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, OpossumId } from "../../../types";
import { SaffordChinProfile } from "./profile";
import { SAFFORD_CHIN_DESCRIPTION, SAFFORD_CHIN_DIMENSIONS, parts } from "./Description";
import { SaffordChinGeneral } from "./General";
import { SaffordChinSounds, playSaffordChinBark } from "./Sounds";

export * from "./profile";
export * from "./General";
export * from "./Description";
export * from "./Sounds";
export * from "./Animations";

export const SaffordChinOpossum: OpossumCharacter = {
  id: OpossumId.SAFFORD_CHIN,
  name: "Safford Chin",
  width: 28.5,
  length: 72,
  headWidth: 27,
  headHeight: 28,
  shoulderHeight: "3 feet, 10.0000088 inches",
  color: "Light-Blue",
  eyeColor: "Light-brown",
  noseColor: "Black",
  tailColor: "Black",
  innerEarColor: "Brown",
  gender: "Male",
  sex: "Jack",
  headOrientation: "perched forward with focused builder posture in natural orientation",
  description: SAFFORD_CHIN_DESCRIPTION,
  playChatter: playSaffordChinBark
};

export const SaffordChin = {
  ...SaffordChinProfile,
  description: SAFFORD_CHIN_DESCRIPTION,
  dimensions: SAFFORD_CHIN_DIMENSIONS,
  general: SaffordChinGeneral,
  parts,
  sounds: SaffordChinSounds,
  character: SaffordChinOpossum
};

export default SaffordChinOpossum;
